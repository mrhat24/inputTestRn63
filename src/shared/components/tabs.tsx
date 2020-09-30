import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

export interface TabItem {
  title: string;
  render: React.ReactNode;
}

export interface Props {
  tabs: TabItem[];
}

export const Tabs = ({tabs}: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab] || null;
  const {height} = useWindowDimensions();
  if (currentTab === null) {
    return null;
  }
  return (
    <View style={{height}}>
      <View style={styles.view}>{currentTab.render}</View>
      <View style={styles.tabControls}>
        {tabs.map((tab, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.tabControlItem,
                index === activeTab ? styles.tabControlItemActive : null,
              ]}
              onPress={() => setActiveTab(index)}
              key={index}>
              <View>
                <Text>{tab.title}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 15,
  },
  tabControls: {
    height: 60,
    flexDirection: 'row',
  },
  tabControlItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabControlItemActive: {
    backgroundColor: '#ccc',
  },
});
