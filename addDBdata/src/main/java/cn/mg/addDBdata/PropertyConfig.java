package cn.mg.addDBdata;

import java.io.*;
import java.util.Properties;

public class PropertyConfig {
    private static final String config_path = "jdbc.properties";
    private Properties prop = null;
    private File file = null;
    private InputStream fis = null;

    public PropertyConfig() {
        try {
            prop = new Properties();
            file = new File("jdbc.properties");
            if (!file.exists()) {
                file.createNewFile();
            } else {
                fis = new FileInputStream(file);
                prop.load(fis);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getProperty(String key, String defaultValue) {
        try {
            if (prop != null) {
                return prop.getProperty(key, defaultValue);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return defaultValue;
    }

    public Boolean setProperty(String key, String value) {
        if (prop != null) {
            prop.setProperty(key, value);
            return true;
        }
        else {
            return false;
        }
    }

    public Boolean store() {
        try {
            if (prop != null) {
                FileOutputStream fos = new FileOutputStream(file);
                prop.store(fos, "");
                fos.close();
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

}
