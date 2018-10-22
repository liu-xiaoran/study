package cn.mg.addDBdata;

import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;


public class AddData{
    private static Logger logger = LoggerFactory.getLogger(AddData.class);

    public static PropertyConfig prop = null;
    private static JdbcTemplate jdbcTemplate = null;


    public static void DBConnectConfig() {
        try{
            jdbcTemplate = new JdbcTemplate();
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            String url = prop.getProperty("jdbc.url","");
            String username = prop.getProperty("jdbc.username","");
            String password = prop.getProperty("jdbc.password","");
            if(url != "" && username != "" && password != ""){
                dataSource.setDriverClassName(prop.getProperty("jdbc.driverClassName","com.microsoft.sqlserver.jdbc.SQLServerDriver"));
                dataSource.setUrl(url);
                dataSource.setUsername(username);
                dataSource.setPassword(password);
                jdbcTemplate.setDataSource(dataSource);

                addData();
            }else {
                logger.error("jdbc配置文件缺失");
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("jdbc配置文件加载错误" + e.getMessage());
        }
    }
    public static String setFormet(int num){
        if (num<10){
            return "0"+num;
        }else {
            return String.valueOf(num);
        }
    };
    public static void addData(){

        while (true) {
            try {
                int i = 0;
                String SQL = "";
                while (i<10) {
                    Calendar cal = Calendar.getInstance();
                    int year = cal.get(Calendar.YEAR);
                    int month = cal.get(Calendar.MONTH) + 1;
                    int day = cal.get(Calendar.DAY_OF_MONTH);
                    int hour = cal.get(Calendar.HOUR_OF_DAY);
                    int minute = cal.get(Calendar.MINUTE);
                    int second = cal.get(Calendar.SECOND);
                    Long XHC = (long) (Math.random() * 9 * Math.pow(10, 16)) + (long) Math.pow(10, 16);
                    SQL += "INSERT INTO [PFSALEFORM] VALUES " +
                            "(" + "N'XHC" + XHC + "'" + ", NULL, N'C27001', NULL, N'000000', N'0001', NULL, N'2018-03-17', N'0', N'2018-03-17', N'1', 1005.0000, 0.0000, 4020.0000, 4020.0000, 10050.0000, 1392.9300, 0.0000, 6.9000, 0.0000, N'1', 0, N'2018-03-13', NULL, " +
                            "N'" + year + "-" + setFormet(month) + "-" + setFormet(day) + "'" + ", N'1', 0x00000000000F512C, N'9999', N'管理员', N'9999', N'管理员', N'9999', N'管理员', N'上海晨光', N'晨光销售0085', N'', NULL, N'', 1392.9300, 6.9000, 0.0000, 0.0000, 0.0000, 0.0300, 0.0000, 1386.0000, NULL, NULL, N'PRC27001201803170003', N'9999', N'管理员', " +
                            "N'" + setFormet(hour) + ":" + setFormet(minute) + ":" + setFormet(second) + "'" + ", N'http://scrm.mg-pen.com/fxj/?id=XHC27001201803170002&p=6.90&a=JD001-6.90_', NULL, N'0', N'0', NULL, NULL, NULL); " +
                            "INSERT INTO [PFSaleDetail] VALUES " +
                            "(" + "N'XHC" + XHC + "'" + ", 100000000, '00000050', '6947503755713', '晨光中性笔孔庙祈福AGP10702蓝0.5', 'AGP10702B', '1/12/144/1728', '上海', '', 0.0000, 'PCS', 1.6000, 0.0000, 0.0000, 1.2000, 0.0000, 1.2000, 1.0000, 0.0000, 1.2000, 0.0000, 0.0000, 0.0000, 1.6000, 0, NULL, '晨光文具', '000000', NULL, 0.0000, 1.0000, 1.2000, 1.0000, 0.0000, 0.0000, 0.0000, 0.2000, '', NULL, '1', '1单件', '0', '', '', NULL, 0.0000, 0.0000); " +
                            "INSERT INTO [PFSaleDetail] VALUES " +
                            "(" + "N'XHC" + XHC + "'" + ", 100000001, '00000050', '6947503755713', '晨光中性笔孔庙祈福AGP10702蓝0.5', 'AGP10702B', '1/12/144/1728', '上海', '', 0.0000, 'PCS', 1.6000, 0.0000, 0.0000, 1.2000, 0.0000, 1.2000, 1.0000, 0.0000, 1.2000, 0.0000, 0.0000, 0.0000, 1.6000, 0, NULL, '晨光文具', '000000', NULL, 0.0000, 1.0000, 1.2000, 1.0000, 0.0000, 0.0000, 0.0000, 0.2000, '', NULL, '1', '1单件', '0', '', '', NULL, 0.0000, 0.0000); ";
                    i++;
                }

                try {
                    jdbcTemplate.update(SQL);
                } catch (DataIntegrityViolationException e) {
                    logger.error("违反数据库唯一性" + e.getMessage());
                } catch (Exception e) {
                    logger.error("SQL执行错误" + e.getMessage());
                }

                Thread.sleep(5000);
            } catch (Exception e) {
                logger.error("SQL执行错误" + e.getMessage());
                continue;
            }
        }
    }

    public static void main(String[] args){
        prop = new PropertyConfig();
        DBConnectConfig();
    }
}