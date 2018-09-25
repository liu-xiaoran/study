/**
 * FreshJuiceTest
 */
class FreshJuice {
    enum FreshJuiceSize { S,M,L }
    FreshJuiceSize size;
}
public class FreshJuiceTest {
    public static void main(String[] args) {
        FreshJuice juice = new FreshJuice();
        juice.size = FreshJuice.FreshJuiceSize.S;
    }
}