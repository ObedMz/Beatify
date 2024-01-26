import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

interface ScreenLayoutProps {
  children: ReactNode;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C2A',
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingLeft: 8,
    paddingRight: 8,
  }
});

export default ScreenLayout;
