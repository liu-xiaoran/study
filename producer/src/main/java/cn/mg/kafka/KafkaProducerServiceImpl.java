package cn.mg.kafka;

import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
public class KafkaProducerServiceImpl implements KafkaProducerService {

	private static Logger logger = LoggerFactory.getLogger(KafkaProducerServiceImpl.class);
	
	// 定义服务的地址，不需要将所有broker指定上
    private final static String bootstrapServers = "118.24.53.99:9092";
    // 序列化类 
    private final static String byteArraySerializer = "org.apache.kafka.common.serialization.ByteArraySerializer";
    private final static String jsonSerializer = "org.apache.kafka.connect.json.JsonSerializer";

	private Producer producer = null;
    private ObjectMapper objectMapper = new ObjectMapper();

    public KafkaProducerServiceImpl() {
        Properties producerConfigProperties = new Properties();
        producerConfigProperties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        producerConfigProperties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, byteArraySerializer);
        producerConfigProperties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, jsonSerializer);
        producer = new KafkaProducer(producerConfigProperties);
    }

	@Override
    public boolean sendMessage(boolean async, Object message, String topicName) throws InterruptedException, ExecutionException {
        try {
//            Map sentData = new HashMap();
//            sentData.put("orgCode", orgCode);
//            sentData.put("timestamp", currentTime);
//            sentData.put("data", message);
            JsonNode jsonNode = objectMapper.valueToTree(message);
            ProducerRecord<String, JsonNode> rec = new ProducerRecord<String, JsonNode>(topicName, jsonNode);
            if (async) {
                producer.send(rec, new Callback(){
                    @Override
                    public void onCompletion(RecordMetadata recordMetadata, Exception e) {
                        if(e != null){
                        	logger.error("catch exception : " + e + " ,UNDELIVERED MESSAGE : " + message.toString());
                        }
                        logger.info("Producer : Partition:" + recordMetadata.partition() + ", Offset:" + recordMetadata.offset() + ", Values:" + message.toString());
                    }
                });
            } else {
                Future<RecordMetadata> future = producer.send(rec);
//                System.out.println("Future,  offset : " + future.get().offset() +", topic : "+future.get().topic());
            }
            producer.flush();
            return true;
        } catch (Exception ex) {
        	logger.error("Exception occurred while sending the message : " + ex.getMessage());
            return false;
        }
    }

	@Override
	public boolean sendMessage(boolean async, List<Map<String, Object>> message,String topicName) throws InterruptedException, ExecutionException {
		try {
            for (Object messageElement : message){
//                Map sentData = new HashMap();
//                sentData.put("orgCode", orgCode);
//                sentData.put("timestamp", currentTime);
//                sentData.put("data", messageElement);
                JsonNode jsonNode = objectMapper.valueToTree(messageElement);

                ProducerRecord<String, JsonNode> rec = new ProducerRecord<String, JsonNode>(topicName, jsonNode);
                if (async) {
                    producer.send(rec, new Callback(){
                        @Override
                        public void onCompletion(RecordMetadata recordMetadata, Exception e) {
                            if(e != null){
                                logger.error("catch exception : " + e + " ,UNDELIVERED MESSAGE : " + message.toString());
                            }
                            logger.info("Producer : Partition:" + recordMetadata.partition() + ", Offset:" + recordMetadata.offset() + ", Values:" + message.toString());
                        }
                    });
                } else {
                    Future<RecordMetadata> future = producer.send(rec);
    //                System.out.println("Future,  offset : " + future.get().offset() +", topic : "+future.get().topic());
                }
            }
            producer.flush();
            return true;
        } catch (Exception ex) {
        	logger.error("Exception occurred while sending the message : " + ex);
            return false;
        }
	}

	@Override
	public boolean sendMessage(boolean async, String message, String topicName) throws InterruptedException, ExecutionException {
		try {
            JsonNode jsonNode = objectMapper.valueToTree(message);
	        ProducerRecord<String, JsonNode> rec = new ProducerRecord<String, JsonNode>(topicName, jsonNode);
	       
	        if (async) {
	            producer.send(rec, new Callback(){
                    @Override
                    public void onCompletion(RecordMetadata recordMetadata, Exception e) {
                        if(e != null){
                        	logger.error("catch exception : " + e + " ,UNDELIVERED MESSAGE : " + message);
                        }
                        logger.info("Producer : Partition:" + recordMetadata.partition() + ", Offset:" + recordMetadata.offset() + ", Values:" + message);
                    }
                });
	        } else {
	            Future<RecordMetadata> future = producer.send(rec);
//	            System.out.println("Future,  offset : " + future.get().offset() +", topic : "+future.get().topic());
	        }
            producer.flush();
	        return true;
	    } catch (Exception ex) {
	    	logger.error("Exception occurred while sending the message : " + ex.getMessage());
	        return false;
		}
	}
}
