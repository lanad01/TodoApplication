import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Banana31', value: 'banan2a' },
    { label: 'Banan3a', value: 'banan23a' },
  ]);

  return (
    <DropDownPicker
    containerStyle={{
      width:150
    }}
    labelStyle={{
      fontFamily:"BMJUA"
    }}
    style={{width:100, height:50 }}
      closeAfterSelecting={true}
      open={open}
      value={value}
      onChangeValue={()=> console.log("Cons")}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
