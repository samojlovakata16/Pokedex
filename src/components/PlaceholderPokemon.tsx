import Svg, {Circle, Path} from 'react-native-svg';
import {View} from 'react-native';

export default function PlaceholderPokemon() {
  return (
    <View style={{width: 80, height: 80}}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="gray"
          strokeWidth="5"
          fill="#e0e0e0"
        />
        <Path
          d="M 30 40 Q 50 60, 70 40"
          stroke="gray"
          strokeWidth="4"
          fill="none"
        />
        <Circle cx="40" cy="35" r="5" fill="gray" />
        <Circle cx="60" cy="35" r="5" fill="gray" />
      </Svg>
    </View>
  );
}
