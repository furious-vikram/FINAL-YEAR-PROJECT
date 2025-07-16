-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'customer', 'admin')),
  address TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create crop categories table
CREATE TABLE public.crop_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create crops table
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  category_id UUID REFERENCES public.crop_categories(id),
  image_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cart table
CREATE TABLE public.cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(customer_id, crop_id)
);

-- Create storage requests table
CREATE TABLE public.storage_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create inventory table
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_request_id UUID REFERENCES public.storage_requests(id) ON DELETE CASCADE NOT NULL,
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  storage_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  condition TEXT NOT NULL DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  warehouse_location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create crop guides table
CREATE TABLE public.crop_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  crop_category_id UUID REFERENCES public.crop_categories(id),
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  season TEXT,
  climate_suitability TEXT,
  growth_duration TEXT,
  media_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_guides ENABLE ROW LEVEL SECURITY;

-- Create security definer functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT get_user_role(auth.uid()) = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_farmer()
RETURNS BOOLEAN AS $$
  SELECT get_user_role(auth.uid()) = 'farmer';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_customer()
RETURNS BOOLEAN AS $$
  SELECT get_user_role(auth.uid()) = 'customer';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (is_admin());

-- RLS Policies for crop_categories
CREATE POLICY "Anyone can view crop categories" ON public.crop_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage crop categories" ON public.crop_categories
  FOR ALL USING (is_admin());

-- RLS Policies for crops
CREATE POLICY "Anyone can view crops" ON public.crops
  FOR SELECT USING (true);

CREATE POLICY "Farmers can manage their own crops" ON public.crops
  FOR ALL USING (farmer_id = auth.uid() OR is_admin());

CREATE POLICY "Farmers can insert crops" ON public.crops
  FOR INSERT WITH CHECK (farmer_id = auth.uid() AND is_farmer());

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (customer_id = auth.uid() OR is_admin());

CREATE POLICY "Customers can create orders" ON public.orders
  FOR INSERT WITH CHECK (customer_id = auth.uid() AND is_customer());

CREATE POLICY "Customers can update their orders" ON public.orders
  FOR UPDATE USING (customer_id = auth.uid() OR is_admin());

-- RLS Policies for cart
CREATE POLICY "Users can manage their own cart" ON public.cart
  FOR ALL USING (customer_id = auth.uid());

-- RLS Policies for storage_requests
CREATE POLICY "Farmers can view their own storage requests" ON public.storage_requests
  FOR SELECT USING (farmer_id = auth.uid() OR is_admin());

CREATE POLICY "Farmers can create storage requests" ON public.storage_requests
  FOR INSERT WITH CHECK (farmer_id = auth.uid() AND is_farmer());

CREATE POLICY "Admins can manage storage requests" ON public.storage_requests
  FOR ALL USING (is_admin());

-- RLS Policies for inventory
CREATE POLICY "Admins can manage inventory" ON public.inventory
  FOR ALL USING (is_admin());

-- RLS Policies for crop_guides
CREATE POLICY "Anyone can view public crop guides" ON public.crop_guides
  FOR SELECT USING (is_public = true);

CREATE POLICY "Farmers can view all crop guides" ON public.crop_guides
  FOR SELECT USING (is_farmer() OR is_admin());

CREATE POLICY "Admins can manage crop guides" ON public.crop_guides
  FOR ALL USING (is_admin());

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON public.crops
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_storage_requests_updated_at BEFORE UPDATE ON public.storage_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_crop_guides_updated_at BEFORE UPDATE ON public.crop_guides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial crop categories
INSERT INTO public.crop_categories (name, description) VALUES
  ('Vegetables', 'Fresh vegetables and leafy greens'),
  ('Fruits', 'Fresh fruits and berries'),
  ('Grains', 'Cereal grains and staple crops'),
  ('Herbs', 'Culinary and medicinal herbs'),
  ('Legumes', 'Beans, peas, and other legumes');

-- Insert sample crop guides
INSERT INTO public.crop_guides (title, content, crop_category_id, difficulty_level, season, climate_suitability, growth_duration, is_public) VALUES
  ('Growing Tomatoes for Beginners', 'Tomatoes are one of the most popular crops for new farmers. Start with determinate varieties for easier management...', 
   (SELECT id FROM crop_categories WHERE name = 'Vegetables'), 'beginner', 'Spring-Summer', 'Warm climate, 65-75°F', '70-80 days', true),
  ('Organic Wheat Cultivation', 'Wheat is a staple grain crop that requires careful planning and timing. Choose the right variety for your climate zone...', 
   (SELECT id FROM crop_categories WHERE name = 'Grains'), 'intermediate', 'Fall-Spring', 'Temperate climate, 60-70°F', '180-220 days', true),
  ('Herb Garden Management', 'Creating a successful herb garden requires understanding the specific needs of each herb variety...', 
   (SELECT id FROM crop_categories WHERE name = 'Herbs'), 'beginner', 'Year-round', 'Various climates', '30-90 days', true);