package cn.mg.kafka;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface KafkaProducerService {
    
    public boolean sendMessage(boolean async, Object message,String topicName) throws InterruptedException, ExecutionException;
    public boolean sendMessage(boolean async, List<Map<String, Object>> message,String topicName) throws InterruptedException, ExecutionException;
    public boolean sendMessage(boolean async, String message,String topicName) throws InterruptedException, ExecutionException;
}
