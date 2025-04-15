import {ScrollView, Text, Image, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {usePokemonDetails} from '../../hooks/usePokemonDetails';
import AppLayout from '../../components/AppLayout';
import StatusMessage from '../../components/StatusMessage';
import {getPokemonImage} from '../../utils/getPokemonImage';
import LabelValue from '../../components/LabelValue';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({route}: Props) {
  const {pokemon} = route.params;
  const {data, loading, error, types, stats} = usePokemonDetails(pokemon.id);

  if (error) {
    return (
      <AppLayout>
        <StatusMessage text={error} isError />
      </AppLayout>
    );
  }

  if (loading || !data) {
    return (
      <AppLayout>
        <StatusMessage text="Loading..." isLoading />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={getPokemonImage(data.id)} style={styles.image} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{data.name}</Text>
            <LabelValue label="Id" value={data.id} />
            <LabelValue label="Types" value={types} />
          </View>
        </View>

        <LabelValue label="Height" value={data.height} />
        <LabelValue label="Weight" value={data.weight} />
        <LabelValue label="Base exp" value={data.base_experience} />
        <LabelValue label="Stats" value={stats} />
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
