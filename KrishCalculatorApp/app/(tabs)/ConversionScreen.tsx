import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';



export default function ConverterScreen() {
  const [num1, setNum1] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('centimeters');

  const conversionTable: any = {
    meters: 1,
    centimeters: 100,
    kilometers: 0.001,
    inches: 39.3701,
    feet: 3.28084,
    miles: 0.000621371,
    grams: 1,
    kilograms: 0.001,
    pounds: 0.00220462,
    ounces: 0.035274,
  };

  const convertUnits = () => {
    const n1 = parseFloat(num1);
    if (isNaN(n1)) {
      alert('Please enter a valid number');
      return;
    }
    // Convert input to a base unit (meters for length, grams for weight)
    const baseValue = n1 / conversionTable[fromUnit];
    const convertedValue = baseValue * conversionTable[toUnit];
    setResult(Number(convertedValue.toFixed(4)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={fromUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setFromUnit(itemValue)}
      >
        {Object.keys(conversionTable).map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={toUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setToUnit(itemValue)}
      >
        {Object.keys(conversionTable).map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Button title="Convert" onPress={convertUnits} />

      {result !== null && (
        <Text style={styles.result}>
          {num1} {fromUnit} = {result} {toUnit}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
