  import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';



export default function App() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [lastResult, setLastResult] = useState<number | null>(null);

    const noname = () => {
      if (num1 === null || num1 === '') {
        styles.pretext
      }
   
    };
    
   
    const sqNumbers = () => {
      const n1 = parseFloat(num1);
      const square = n1*n1;

      if (!isNaN(n1)) {
          setLastResult(result);  
          setResult(square);
        } else {
          setResult(null); // don’t show result at all if input is invalid
          alert('Please enter valid numbers'); // show popup alert instead
        }
  };

  const cubeNumbers = () => {
    const n1 = parseFloat(num1);
    const cube = n1*n1*n1;

    if (!isNaN(n1)) {
        setLastResult(result);  
        setResult(cube);
      } else {
        setResult(null); // don’t show result at all if input is invalid
        alert('please enter valid numbers'); // show popup alert instead
      }
};

    const sqRootNumbers = () => {
        const n1 = parseFloat(num1);
        const squareRoot = Math.sqrt(n1);

        if (!isNaN(n1)) {
            setLastResult(result);  
            setResult(squareRoot);
          } else {
            setResult(null); // don’t show result at all if input is invalid
            alert('Please enter valid numbers'); // show popup alert instead
          }
    };
    const cubeRootNumbers = () => {
      const n1 = parseFloat(num1);
      const cubeRoot = Math.cbrt(n1);

      if (!isNaN(n1)) {
          setLastResult(result);  
          setResult(Number(cubeRoot.toFixed(2)));
        } else {
          setResult(null); // don’t show result at all if input is invalid
          alert('Please enter valid numbers'); // show popup alert instead
        }
  };
    const addNumbers = () => {
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);
    
      if (!isNaN(n1) && !isNaN(n2)) {
        const result=n1 + n2
        setLastResult(result);
        setResult(result);
      } else {
        setResult(null); // don’t show result at all if input is invalid
        alert('Please enter valid numbers'); // show popup alert instead
      }
  };

  const subtractNumbers = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=n1 - n2
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
        setResult(n1 - n2);
    } else {
      setResult(null); // don’t show result at all if input is invalid
      alert('Please enter valid numbers4'); // show popup alert instead
    }
};
const multiplyNumbers = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=n1 * n2
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
        setResult(n1 * n2);
    } else {
      setResult(null); // don’t show result at all if input is invalid
      alert('Please enter valid numbers3'); // show popup alert instead
    }
}; 
const divideNumbers = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=n1 / n2
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
        setResult(n1 / n2);
    } else {
      setResult(null); // don’t show result at all if input is invalid
      alert('Please enter valid numbers2'); // show popup alert instead
    }
}; 

const findPercentage = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=((n1 * n2)/100)
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
        setResult((n1 * n2)/100);
    } else {
      setResult(null); // don’t show result at all if input is inval
      alert('Please enter valid numbers 1'); // show popup alert instead
    }
}; {}
const powerNumbers = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
  const result= Math.pow(n1, n2) 
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result); 
        setResult(Math.pow(n1, n2));

    } else {
      setResult(null);
      alert('Please enter valid numbers for exponent');
    }
  };
  const modulusNumbers = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=n1 % n2
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result); setResult(n1 % n2);

    } else {
      setResult(null);
      alert('Please enter valid numbers for modulus');
    }
  };
  const absoluteValue = () => {
    const n1 = parseFloat(num1);
    const result=Math.abs(n1)
    if (!isNaN(n1)) {
      setLastResult(result);
      setResult(Math.abs(n1));
    } else {
      setResult(null);
      alert('Please enter a valid number for absolute value');
    }
  };
  
  const findMinimum = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=Math.min(n1, n2)
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
         setResult(Math.min(n1, n2));
    } else {
      setResult(null);
      alert('Please enter valid numbers to find minimum');
    }
  };
  
  const findMaximum = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result=Math.max(n1, n2)
    if (!isNaN(n1) && !isNaN(n2)) {
        setLastResult(result);
        setResult(Math.max(n1, n2));
    } else {
      setResult(null);
      alert('Please enter valid numbers to find maximum');
    }
  };
  const clearAll = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };
    
    

  const redoLast = () => {
    console.log("Last result is:", lastResult); //  check what's inside!
    if (lastResult !== null) {
      setResult(lastResult);
    } else {
      alert('Nothing to redo!');
    }
  };
  
return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <TextInput
        style={styles.pretext}
        placeholder="Enter first number"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />

      <TextInput
        style={styles.pretext}
        placeholder="Enter second number"
        keyboardType="numeric" 
        onChangeText={setNum2}
        
        value={num2}
      />

     

      <View style={styles.buttonRow}>
  <Button title=" + " onPress={addNumbers} />
  <Button title=" - " onPress={subtractNumbers} />
  <Button title=" × " onPress={multiplyNumbers} />
  <Button title=" ÷ " onPress={divideNumbers} />
  </View>
  <View style={styles.buttonRow}>
  <Button title="^² " onPress={sqNumbers} /> 
  <Button title=" √ " onPress={sqRootNumbers} />
  <Button title="^3 " onPress={cubeNumbers} /> 
  <Button title=" ∛ " onPress={cubeRootNumbers} />


  <Button title="%" onPress={findPercentage} />
  <Button title="^n" onPress={powerNumbers} />
  </View>
  <View style={styles.buttonRow}>
  <Button title="R" onPress={modulusNumbers} />
  <Button title="Abs |x|" onPress={absoluteValue} />
  <Button title="Min" onPress={findMinimum} />
  <Button title="Max" onPress={findMaximum} />
  </View>
  <View style={styles.buttonRow}>
  <Button title="Clear" color="gray" onPress={clearAll} />
  <Button title="←" color="green" onPress={redoLast} />
  </View>
   

      
      {result !== null && (
        <Text style={styles.result}>Result: {result}</Text>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    fontStyle: 'normal',
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // makes buttons go to next line if screen is small
    gap: 10, // for spacing between buttons (React Native 0.71+)
    marginTop: 10,
  },
  
  pretext: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'gray',
    fontStyle: 'italic',
  }
});