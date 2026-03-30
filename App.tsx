import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  BackHandler,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';

const WEBSITE_URL = 'https://www.elevatedrootsma.com';

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: WEBSITE_URL }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3A7D44" />
            <Text style={styles.loadingText}>Loading Elevated Roots...</Text>
          </View>
        )}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3A7D44" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1D14',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1D14',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11,29,20,0.9)',
  },
  loadingText: {
    marginTop: 16,
    color: '#ffffff',
    fontSize: 16,
  },
});
