package cn.mg.producer;

import java.util.List;
import java.text.SimpleDateFormat;

import cn.mg.kafka.KafkaProducerServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;



public class Producer {
    private static Logger logger = LoggerFactory.getLogger(Producer.class);
    private static JdbcTemplate jdbcTemplate = new JdbcTemplate();
    private static SimpleDateFormat format =  new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );
    public static String orgCode = "orgCode";

    private static KafkaProducerServiceImpl kafkaProducerSent = new KafkaProducerServiceImpl();
    public static void main(String[] args) {
        Long currentTime = System.currentTimeMillis();
        Long startTime = Long.parseLong("1483203661000");
        testConfigJDBC();
        testSendMsg(jdbcTemplate, currentTime, startTime);
    }
    public static void testConfigJDBC() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSource.setUrl("jdbc:sqlserver://192.168.0.34:1433;DatabaseName=SysDBsx");
        dataSource.setUsername("sa");
        dataSource.setPassword("Drp123");
        jdbcTemplate.setDataSource(dataSource);
    }

    public static void queryOrgCode(JdbcTemplate jdbcTemplates){
        String orgCodeSQL = "SELECT ISNULL(ItemValue,'') FROM SysCfg WHERE Section='SYSTEM' AND ItemName='BRANCHNO'";
        try{
            orgCode = (String) jdbcTemplates.queryForObject(orgCodeSQL, String.class);
        } catch (CannotGetJdbcConnectionException e) {
            logger.error("数据库参数配置错误：" + e);
        } catch (Exception e){
            logger.error("Exception：" + e);
        }
    }


    public static boolean sentSaleForm(JdbcTemplate jdbcTemplates,Long currentTime,Long startTime){
        try{
            String startDate = format.format(startTime);
            String currentDate = format.format(currentTime);
            boolean result = true;
            boolean morePaging = true;
            int paging = 0;
            int pageSize = 100; // 分页数量
            while (morePaging) {
                String SQL = "SELECT TOP "+pageSize+" " + currentTime + " AS sentTimestamp,'" + orgCode + "' AS localOrg, * FROM pfsaleform " +
                        " WHERE RzDate+' '+RzTime >= '" + startDate + "' AND RzDate+' '+RzTime <= '" + currentDate + "'" +
                        " AND PFSaleNo NOT IN (SELECT TOP " + pageSize * paging + " PFSaleNo FROM pfsaleform WHERE RzDate+' '+RzTime >= '" + startDate + "' AND RzDate+' '+RzTime <= '" + currentDate + "' ORDER BY PFSaleNo) ORDER BY PFSaleNo";
                List rows = jdbcTemplates.queryForList(SQL);
                result = kafkaProducerSent.sendMessage(true, rows, "Pfsaleform");
                if (result == false) {
                    return result;
                }
                if (rows.size()<pageSize){
                    morePaging = false;
                }
                paging++;
            }
            return result;
        } catch (CannotGetJdbcConnectionException e) {
            logger.error("数据库参数配置错误：" + e);
            return false;
        } catch (Exception e){
            logger.error("Exception：" + e);
            return false;
        }
    }
    public static boolean sentSaleDetail(JdbcTemplate jdbcTemplates,Long currentTime,Long startTime){
        try{
            String startDate = format.format(startTime);
            String currentDate = format.format(currentTime);
            boolean result = true;
            boolean morePaging = true;
            int paging = 0;
            int pageSize = 100; // 分页数量
            while (morePaging) {
                String SQL = "SELECT TOP "+pageSize+" " + currentTime + " AS sentTimestamp,'" + orgCode + "' AS localOrg, * FROM Pfsaledetail" +
                        " WHERE (exists (SELECT 1 FROM Pfsaleform WHERE Pfsaleform.PFSaleNo = Pfsaledetail.PFSaleNo AND Pfsaleform.RzDate+' '+Pfsaleform.RzTime >= '" + startDate + "' AND Pfsaleform.RzDate+' '+Pfsaleform.RzTime <= '" + currentDate + "'))"+
                        " AND (PFSaleNo+CONVERT(varchar(19), SerialNo)+PluCode NOT IN (SELECT TOP "+pageSize*paging+" PFSaleNo+CONVERT(varchar(19), SerialNo)+PluCode FROM Pfsaledetail WHERE EXISTS " +
                        "(SELECT 1 FROM Pfsaleform WHERE Pfsaleform.PFSaleNo = Pfsaledetail.PFSaleNo AND Pfsaleform.RzDate+' '+Pfsaleform.RzTime >= '" + startDate + "' AND Pfsaleform.RzDate+' '+Pfsaleform.RzTime <= '" + currentDate + "') ORDER BY PFSaleNo,SerialNo,PluCode ))ORDER BY PFSaleNo,SerialNo,PluCode";

                List rows = jdbcTemplates.queryForList(SQL);
                result = kafkaProducerSent.sendMessage(true, rows, "Pfsaledetail");
                if (result == false) {
                    return result;
                }
                if (rows.size()<pageSize){
                    morePaging = false;
                }
                paging++;
            }
            return result;
        } catch (CannotGetJdbcConnectionException e) {
            logger.error("数据库参数配置错误：" + e);
            return false;
        } catch (Exception e){
            logger.error("Exception：" + e);
            return false;
        }
    }
    public boolean sendMsg(JdbcTemplate jdbcTemplates,Long currentTime,Long startTime) {
        if (orgCode == "orgCode"){
            queryOrgCode(jdbcTemplates);
        }
        boolean resultForm = sentSaleForm(jdbcTemplates, currentTime, startTime);
        boolean resultDetail = sentSaleDetail(jdbcTemplates, currentTime, startTime);
        boolean result = resultForm && resultDetail;
        return result;
    }
    public static boolean testSendMsg(JdbcTemplate jdbcTemplates,Long currentTime,Long startTime) {
        if (orgCode == "orgCode"){
            queryOrgCode(jdbcTemplates);
        }

        boolean resultForm = sentSaleForm(jdbcTemplates, currentTime, startTime);
        boolean resultDetail = sentSaleDetail(jdbcTemplates, currentTime, startTime);
        boolean result = resultForm && resultDetail;
        return result;
    }
}