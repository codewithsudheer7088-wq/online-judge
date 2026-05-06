import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = 0, b = 0;

        if (sc.hasNextInt()) a = sc.nextInt();
        if (sc.hasNextInt()) b = sc.nextInt();

        System.out.println(a + b);
    }
}