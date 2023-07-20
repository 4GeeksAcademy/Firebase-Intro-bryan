export const weatherToGradientDay = {
    'Sunny': 'gradient-sunny',
    'Cloudy': 'gradient-cloudy',
    'Partly cloudy': 'partly-cloudy',
    'Overcast': 'overcast',
    'Mist': 'mist',
    'Patchy rain possible': 'patchy-rain',
    'Rain': 'gradient-rain',
    'Clear': 'clear',
  };
  
  
  export const weatherToGradientNight = {
    'Sunny': 'gradient-night-sunny',
    'Cloudy': 'gradient-night-cloudy',
    'Partly cloudy': 'gradient-night-partly-cloudy',
    'Overcast': 'gradient-night-overcast',
    'Mist': 'gradient-night-mist',
    'Patchy rain possible': 'gradient-night-patchy-rain',
    'Rain': 'gradient-night-rain',
    'Clear': 'gradient-night-clear',
  };
  
  export const iconMappingDay = {
    'Sunny': 'WiDaySunny',
    'Cloudy': 'WiDayCloudy',
    'Partly cloudy': 'WiDayCloudyHigh',
    'Overcast': 'WiCloudy',
    'Mist': 'WiFog',
    'Patchy rain possible': 'WiDayShowers',
    'Rain': 'WiRain',
    'Clear': 'WiDaySunny',
  };
  
  export const iconMappingNight = {
    'Sunny': 'WiNightClear',
    'Cloudy': 'WiNightAltCloudy',
    'Partly cloudy': 'WiNightAltCloudyHigh',
    'Overcast': 'WiCloudy',
    'Mist': 'WiNightFog',
    'Patchy rain possible': 'WiNightAltShowers',
    'Rain': 'WiNightAltRain',
    'Clear': 'WiNightClear',
  };
  
  export function WeatherIcon({ condition, isDayTime }) {
    const IconComponent = isDayTime ? iconMappingDay[condition] : iconMappingNight[condition];
    
    if (IconComponent) {
      const WeatherIconComponent = require('weather-icons-react')[IconComponent];
      return <WeatherIconComponent size={256} color='#FFF' />;
    }
  
    return null;
  }
  
  export function PaginationIcon({ condition, isDayTime }) {
    const IconComponent = isDayTime ? iconMappingDay[condition] : iconMappingNight[condition];
    
    if (IconComponent) {
      const PaginationIconComponent = require('weather-icons-react')[IconComponent];
      return <PaginationIconComponent size={64} color='#000' />;
    }
  
    return null;
  }
  
    
  export function getGradient(weatherCondition, isDayTime) {
    const weatherToGradient = isDayTime ? weatherToGradientDay : weatherToGradientNight;
    return weatherToGradient[weatherCondition] || 'default-gradient';
  }