import React, {useMemo} from 'react';
import {Text, View, StyleSheet, ViewStyle} from 'react-native';

type Props = {
  label: string;
  value: string | number | (string | number)[];
  containerStyle?: ViewStyle;
};

function LabelValue({label, value, containerStyle}: Props) {
  const content = useMemo(() => {
    if (Array.isArray(value)) {
      return (
        <>
          <Text style={styles.labelBlock}>{label}:</Text>
          {value.map((item, index) => (
            <Text key={index} style={styles.arrayItem}>
              {item}
            </Text>
          ))}
        </>
      );
    }

    return (
      <Text style={styles.inline}>
        <Text style={styles.label}>{label}: </Text>
        {value}
      </Text>
    );
  }, [label, value]);

  return <View style={containerStyle}>{content}</View>;
}

export default React.memo(LabelValue);

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  labelBlock: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  inline: {
    marginVertical: 2,
  },
  arrayItem: {
    marginLeft: 4,
    marginBottom: 2,
  },
});
