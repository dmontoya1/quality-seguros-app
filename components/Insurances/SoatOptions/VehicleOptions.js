import React, { Component } from 'react';

import {
  Container, Header, Left, Body, Right, Button,
  Icon, Card, CardItem, View, Text, Input,
} from 'native-base';
import {
  Image, StyleSheet, Alert, ActivityIndicator, Picker, ScrollView,
} from 'react-native';

class VehicleOptions extends React.Component {
  onSelect = (itemValue) => {
    this.props.onSelect(itemValue);
  };


  render() {
    const { Item } = Picker;
    return (
      <View>
        <Text>Selecciona una opción: </Text>
        <Picker
          selectedValue={this.props.selectedId}
          onValueChange={(itemValue, itemIndex) => this.onSelect(itemValue)}
          prompt="Selecciona una opción"
        >
          <Item label="Selecciona una opción" />
          {this.props.data.map(option => (
            <Item
              key={option.id}
              label={`* ${option.name}`}
              value={option.id}
              selected={this.props.selectedId === option.id}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

export default VehicleOptions;


// import React, { Component } from 'react';

// class VehicleOptions extends React.Component {
//   onSelect = (event) => {
//     this.props.onSelect(parseInt(event.target.value));
//   };

//   render() {
//     return (
//       <div>
//         <span>City: </span>
//         <select onClick={this.onSelect}>
//           <option>Select city</option>
//           {this.props.data.map(city => (
//             <option
//               key={city.id}
//               value={city.id}
//               selected={this.props.selectedId === city.id}
//             >
//               {city.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }
// }

// export default VehicleOptions;
