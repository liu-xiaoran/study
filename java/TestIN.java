package cn.mg.jdbctemplate;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.transaction.support.TransactionCallback;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

@SuppressWarnings("all")
public class TestIN {

    public static void test1() throws Exception{

        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        String url = "jdbc:mysql:///jdbc_test?characterEncoding=UTF-8";
        String username = "root";
        String password = "123456";
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        jdbcTemplate.setDataSource(dataSource);


        jdbcTemplate.update("insert into test (tx) values ('1');");

        jdbcTemplate.update("insert into test (tx) values ('2');");

        jdbcTemplate.update("insert into test (tt) values ('3');");


    }

    public static void test2() throws Exception {
        Context ctx = new InitialContext();

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        String url = "jdbc:mysql:///jdbc_test?characterEncoding=UTF-8";
        String username = "root";
        String password = "123456";
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);



        JdbcTemplate jt = new JdbcTemplate(dataSource);
        DefaultTransactionDefinition tf = new DefaultTransactionDefinition();
        PlatformTransactionManager tm = new DataSourceTransactionManager(dataSource);
        TransactionStatus ts = tm.getTransaction(tf);
        try {

            jt.update("insert into test (tx) values ('1');");

            jt.update("insert into test (tx) values ('2');");

            jt.update("insert into test (tt) values ('3');");

            tm.commit(ts);

        } catch (Exception e) {
            tm.rollback(ts);
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
//            test1();
//            test2();
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }
}
