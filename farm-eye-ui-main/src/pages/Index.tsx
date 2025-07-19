import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sun, Wind, Sprout, BarChart3, MapPin, Wifi, Battery, Leaf, TrendingUp, AlertTriangle, CheckCircle, Clock, Home, CloudRain, Eye, Zap, Activity, Shield, Waves, Camera, Brain, Database, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const environmentalSensors = [{
    id: 1,
    name: 'Temperature',
    value: '24°C',
    icon: Thermometer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    status: 'optimal',
    trend: '+2°C from yesterday',
    location: 'Greenhouse A'
  }, {
    id: 2,
    name: 'Humidity',
    value: '68%',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    status: 'normal',
    trend: '+5% from yesterday',
    location: 'Field B'
  }, {
    id: 3,
    name: 'Light Intensity',
    value: '850 lux',
    icon: Sun,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    status: 'good',
    trend: '+120 lux from yesterday',
    location: 'Greenhouse A'
  }, {
    id: 4,
    name: 'Soil Moisture',
    value: '42%',
    icon: Sprout,
    color: 'text-brown-500',
    bgColor: 'bg-amber-50',
    status: 'low',
    trend: '-8% from yesterday',
    location: 'Field C'
  }, {
    id: 5,
    name: 'Air Quality (CO2)',
    value: '380 ppm',
    icon: Wind,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    status: 'excellent',
    trend: '-20 ppm from yesterday',
    location: 'Greenhouse B'
  }, {
    id: 6,
    name: 'Water Quality pH',
    value: '6.8',
    icon: BarChart3,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    status: 'optimal',
    trend: '+0.2 from yesterday',
    location: 'Irrigation System'
  }];
  const cropHealthData = [{
    id: 1,
    crop: 'Tomatoes',
    health: 'excellent',
    diseaseRisk: 'low',
    yieldPrediction: '95%',
    lastScanned: '2 hours ago'
  }, {
    id: 2,
    crop: 'Corn',
    health: 'good',
    diseaseRisk: 'medium',
    yieldPrediction: '87%',
    lastScanned: '4 hours ago'
  }, {
    id: 3,
    crop: 'Lettuce',
    health: 'excellent',
    diseaseRisk: 'low',
    yieldPrediction: '92%',
    lastScanned: '1 hour ago'
  }, {
    id: 4,
    crop: 'Carrots',
    health: 'good',
    diseaseRisk: 'low',
    yieldPrediction: '89%',
    lastScanned: '3 hours ago'
  }];
  const livestockData = [{
    id: 1,
    animal: 'Dairy Cows',
    count: 45,
    health: 'healthy',
    feeding: 'automated',
    lastCheck: '30 min ago'
  }, {
    id: 2,
    animal: 'Sheep',
    count: 120,
    health: 'healthy',
    feeding: 'scheduled',
    lastCheck: '1 hour ago'
  }, {
    id: 3,
    animal: 'Chickens',
    count: 200,
    health: 'excellent',
    feeding: 'automated',
    lastCheck: '15 min ago'
  }];
  const weatherData = [{
    parameter: 'Rainfall',
    value: '2.4mm',
    status: 'low',
    forecast: '15mm expected'
  }, {
    parameter: 'Wind Speed',
    value: '12 km/h',
    status: 'normal',
    forecast: 'Increasing to 18 km/h'
  }, {
    parameter: 'UV Index',
    value: '6.2',
    status: 'high',
    forecast: 'Peak at 8.1 today'
  }];
  const automationSystems = [{
    system: 'Irrigation Control',
    status: 'active',
    mode: 'auto',
    efficiency: '94%'
  }, {
    system: 'Greenhouse Climate',
    status: 'active',
    mode: 'auto',
    efficiency: '91%'
  }, {
    system: 'Livestock Feeding',
    status: 'active',
    mode: 'scheduled',
    efficiency: '98%'
  }, {
    system: 'Pest Control',
    status: 'standby',
    mode: 'manual',
    efficiency: '85%'
  }];
  const alerts = [{
    id: 1,
    type: 'warning',
    message: 'Soil moisture low in Field C - Auto irrigation activated',
    time: '5 minutes ago',
    priority: 'medium'
  }, {
    id: 2,
    type: 'info',
    message: 'Drone surveillance completed for tomato crop health assessment',
    time: '15 minutes ago',
    priority: 'low'
  }, {
    id: 3,
    type: 'success',
    message: 'AI detected optimal harvest conditions in Field A',
    time: '1 hour ago',
    priority: 'high'
  }, {
    id: 4,
    type: 'warning',
    message: 'Livestock feeding system requires maintenance',
    time: '2 hours ago',
    priority: 'medium'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'excellent':
      case 'optimal':
        return 'bg-green-100 text-green-800';
      case 'good':
      case 'normal':
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'attention':
      case 'medium':
      case 'standby':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgriSmart Monitor</h1>
                <p className="text-sm text-gray-600">Intelligent Agriculture Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Farm Location: Jharkhand, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <Battery className="h-4 w-4 text-green-500" />
                <Database className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Current Time */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Real-Time Smart Agriculture Dashboard
          </h2>
          <p className="text-gray-600 text-sm">
            Last updated: {currentTime.toLocaleString()} | All systems operational
          </p>
        </div>

        {/* Environmental Monitoring */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 text-green-500 mr-2" />
            Environmental Monitoring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {environmentalSensors.map(sensor => <Card key={sensor.id} className="p-4 hover:shadow-lg transition-all duration-300 bg-white border-l-4 border-green-400">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${sensor.bgColor}`}>
                      <sensor.icon className={`h-4 w-4 ${sensor.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{sensor.name}</h4>
                      <p className="text-lg font-bold text-gray-700">{sensor.value}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(sensor.status)}>
                    {sensor.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  <p>{sensor.location}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {sensor.trend}
                  </div>
                </div>
              </Card>)}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Crop Health Management */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 text-green-500 mr-2" />
              Crop Health Management
            </h3>
            <div className="space-y-3">
              {cropHealthData.map(crop => <div key={crop.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{crop.crop}</h4>
                    <div className="flex space-x-2 text-xs text-gray-600">
                      <span>Health: {crop.health}</span>
                      <span>•</span>
                      <span>Risk: {crop.diseaseRisk}</span>
                      <span>•</span>
                      <span>Yield: {crop.yieldPrediction}</span>
                    </div>
                    <p className="text-xs text-gray-500">Last AI scan: {crop.lastScanned}</p>
                  </div>
                  <Badge className={getStatusColor(crop.health)}>
                    {crop.health}
                  </Badge>
                </div>)}
            </div>
          </Card>

          {/* Livestock Monitoring */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 text-purple-500 mr-2" />
              Livestock Monitoring
            </h3>
            <div className="space-y-3">
              {livestockData.map(livestock => <div key={livestock.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{livestock.animal}</h4>
                    <div className="flex space-x-2 text-xs text-gray-600">
                      <span>Count: {livestock.count}</span>
                      <span>•</span>
                      <span>Feeding: {livestock.feeding}</span>
                    </div>
                    <p className="text-xs text-gray-500">Last check: {livestock.lastCheck}</p>
                  </div>
                  <Badge className={getStatusColor(livestock.health)}>
                    {livestock.health}
                  </Badge>
                </div>)}
            </div>
          </Card>
        </div>

        {/* Weather & Automation Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weather Monitoring */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
              Weather Monitoring
            </h3>
            <div className="space-y-3">
              {weatherData.map((weather, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{weather.parameter}</h4>
                    <p className="text-sm text-gray-600">{weather.value}</p>
                    <p className="text-xs text-gray-500">{weather.forecast}</p>
                  </div>
                  <Badge className={getStatusColor(weather.status)}>
                    {weather.status}
                  </Badge>
                </div>)}
            </div>
          </Card>

          {/* Automation Systems */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              Automation Systems
            </h3>
            <div className="space-y-3">
              {automationSystems.map((system, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{system.system}</h4>
                    <div className="flex space-x-2 text-xs text-gray-600">
                      <span>Mode: {system.mode}</span>
                      <span>•</span>
                      <span>Efficiency: {system.efficiency}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(system.status)}>
                    {system.status}
                  </Badge>
                </div>)}
            </div>
          </Card>
        </div>

        {/* Alerts & AI Insights */}
        <Card className="p-6 bg-white shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 text-purple-500 mr-2" />
            AI-Powered Alerts & Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map(alert => <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">{alert.time}</p>
                    <Badge className={`text-xs ${getStatusColor(alert.priority)}`}>
                      {alert.priority}
                    </Badge>
                  </div>
                </div>
              </div>)}
          </div>
        </Card>

        {/* Technology Integration Panel */}
        <Card className="p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Integrated Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all duration-300">
              <Wifi className="h-6 w-6 mx-auto mb-2" />
              <span className="text-xs font-medium block text-center">IoT Network</span>
              <span className="text-xs opacity-75 block text-center">245 Devices</span>
            </div>
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all duration-300">
              <Camera className="h-6 w-6 mx-auto mb-2" />
              <span className="text-xs font-medium block text-center">Drone Fleet</span>
              <span className="text-xs opacity-75 block text-center">4 Active</span>
            </div>
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all duration-300">
              <Brain className="h-6 w-6 mx-auto mb-2" />
              <span className="text-xs font-medium block text-center">AI Analytics</span>
              <span className="text-xs opacity-75 block text-center">Real-time</span>
            </div>
            <div className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-lg transition-all duration-300">
              <Database className="h-6 w-6 mx-auto mb-2" />
              <span className="text-xs font-medium block text-center">Cloud Storage</span>
              <span className="text-xs opacity-75 block text-center">99.9% Uptime</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-4">Smart Control Center</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Waves className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Irrigation Control</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Home className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Greenhouse Control</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Camera className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Drone Survey</span>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 transform hover:scale-105">
              <BarChart3 className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">AI Analytics</span>
            </button>
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            © 2024 AgriSmart Monitor. Revolutionizing agriculture through AI, IoT, and precision farming.
          </p>
          <div className="flex justify-center items-center mt-2 space-x-4">
            <span className="flex items-center text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              All Systems Online
            </span>
            <span className="flex items-center text-xs">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              IoT Network Active
            </span>
            <span className="flex items-center text-xs">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
              AI Processing
            </span>
            <span className="flex items-center text-xs">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
              Cloud Syncing
            </span>
          </div>
        </footer>
      </div>
    </div>;
};
export default Index;