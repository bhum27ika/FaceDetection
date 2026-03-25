import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ViewStyle } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  style?: ViewStyle;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  label,
  style,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {selectedLabel}
        </Text>
        <ChevronDown size={20} color="#999999" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value === item.value && styles.optionActive,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === item.value && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#333333',
    marginBottom: 8,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectText: {
    fontSize: 16,
    fontFamily: 'Geist',
    color: '#333333',
  },
  placeholder: {
    color: '#999999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  optionActive: {
    backgroundColor: '#F5F2FF',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Geist',
    color: '#333333',
  },
  optionTextActive: {
    fontFamily: 'Geist-Bold',
    color: '#6B5FD9',
  },
});
