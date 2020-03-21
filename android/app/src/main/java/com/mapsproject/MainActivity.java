package com.mapsproject;

import com.facebook.react.ReactActivity;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MapsProject";
  }

  @Override
  protected void onCreate(Bundle state){
    super.onCreate(state);
    SharedPreferences preferences = 
    PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
    
    preferences.edit().putString("debug_http_host", "192.168.1.16:8081").apply();

  }
}
