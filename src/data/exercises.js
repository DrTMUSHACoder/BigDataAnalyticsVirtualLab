export const exercises = [
  {
    id: 1,
    shortTitle: "Java Data Structures",
    title: "Implement the following Data structures in Java\na) Linked Lists b) Stacks c) Queues d) Set e) Map",
    aim: "To implement and perform basic operations on various data structures in Java, including Linked Lists, Stacks, Queues, Sets, and Maps using the Java Collections Framework.",
    procedure: [
      "Open your Java IDE (Eclipse/IntelliJ/VS Code).",
      "Create a Java class named 'DataStructuresLab'.",
      "Implement the main method.",
      "Inside main, create instances of LinkedList, Stack, Queue, HashSet, and HashMap.",
      "Perform basic operations (add, remove, print) on each data structure.",
      "Execute the program and verify the output."
    ],
    code: `import java.util.*;

public class DataStructuresLab {
    public static void main(String[] args) {
        // a) Linked Lists
        System.out.println("--- a) Linked List ---");
        LinkedList<String> list = new LinkedList<>();
        list.add("Hadoop");
        list.add("Spark");
        list.addFirst("BigData");
        System.out.println("List: " + list);

        // b) Stacks
        System.out.println("\\n--- b) Stack ---");
        Stack<String> stack = new Stack<>();
        stack.push("Mapper");
        stack.push("Reducer");
        System.out.println("Popped: " + stack.pop());
        System.out.println("Top: " + stack.peek());

        // c) Queues
        System.out.println("\\n--- c) Queue ---");
        Queue<String> queue = new LinkedList<>(); // LinkedList implements Queue
        queue.add("Job1");
        queue.add("Job2");
        System.out.println("Head of Queue: " + queue.poll());

        // d) Set
        System.out.println("\\n--- d) Set ---");
        Set<String> set = new HashSet<>();
        set.add("HDFS");
        set.add("YARN");
        set.add("HDFS"); // Duplicate ignored
        System.out.println("Set: " + set);

        // e) Map
        System.out.println("\\n--- e) Map ---");
        Map<String, Integer> map = new HashMap<>();
        map.put("Error", 404);
        map.put("OK", 200);
        System.out.println("Map Value for OK: " + map.get("OK"));
    }
}`,
    output: `--- a) Linked List ---
List: [BigData, Hadoop, Spark]

--- b) Stack ---
Popped: Reducer
Top: Mapper

--- c) Queue ---
Head of Queue: Job1

--- d) Set ---
Set: [HDFS, YARN]

--- e) Map ---
Map Value for OK: 200`
  },
  {
    id: 2,
    shortTitle: "Hadoop Installation",
    title: "(i) Perform setting up and Installing Hadoop in its three operating modes:\nStandalone, Pseudo distributed, Fully distributed\n(ii) Use web based tools to monitor your Hadoop setup.",
    aim: "To set up, install, and configure Apache Hadoop in Standalone, Pseudo-distributed, and Fully-distributed modes, and use web tools to monitor the Hadoop dashboard.",
    procedure: [
      "Install Java (JDK 8) and configure SSH (Password-less login).",
      "Download and extract Apache Hadoop (e.g., version 3.3.6).",
      "Configure Hadoop environment variables in .bashrc (JAVA_HOME, HADOOP_HOME).",
      "Standalone Mode: No specific configuration needed. Run the 'grep' example directly.",
      "Pseudo-Distributed Mode: Configure etc/hadoop/core-site.xml and hdfs-site.xml.",
      "Format the filesystem: hdfs namenode -format.",
      "Start NameNode and DataNode: start-dfs.sh.",
      "Fully Distributed Mode: Setup multiple nodes and configure workers file.",
      "Copy configurations to all nodes and start daemons.",
      "Monitoring: Access NameNode Web UI at http://localhost:9870.",
      "Access ResourceManager Web UI at http://localhost:8088."
    ],
    code: `<!-- core-site.xml -->
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>

<!-- hdfs-site.xml -->
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>

# Bash Commands to Start
$ ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ hdfs namenode -format
$ start-dfs.sh
$ start-yarn.sh
$ jps`,
    output: `JPS Output should show:
NameNode
DataNode
ResourceManager
NodeManager
SecondaryNameNode

(Web UI accessible at localhost:9870)`
  },
  {
    id: 3,
    shortTitle: "HDFS File Management",
    title: "Implement the following file management tasks in Hadoop:\n• Adding files and directories\n• Retrieving files\n• Deleting files\nHint: A typical Hadoop workflow creates data files (such as log files) elsewhere and copies them into HDFS using one of the above command line utilities.",
    aim: "To perform basic HDFS operations such as creating directories, uploading local files to HDFS, downloading from HDFS, and deleting files using the Hadoop shell commands.",
    procedure: [
      "Start the Hadoop daemons using start-dfs.sh.",
      "Create a dummy local file (e.g., log_data.txt).",
      "Create a directory in HDFS using 'hdfs dfs -mkdir'.",
      "Upload the local file to HDFS using 'hdfs dfs -put'.",
      "List the files in HDFS using 'hdfs dfs -ls'.",
      "Retrieve the file from HDFS to local system using 'hdfs dfs -get'.",
      "Delete the file from HDFS using 'hdfs dfs -rm'.",
      "Verify completion of all file management tasks."
    ],
    code: `# 1. Create local file
echo "Sample Log Data Entry 1" > log_data.txt

# 2. Make Directory
hdfs dfs -mkdir -p /lab_logs

# 3. Upload File (Adding)
hdfs dfs -put log_data.txt /lab_logs/

# 4. List Files
hdfs dfs -ls /lab_logs/

# 5. Download File (Retrieving)
hdfs dfs -get /lab_logs/log_data.txt ./retrieved_log.txt

# 6. Delete File
hdfs dfs -rm /lab_logs/log_data.txt

# Verify Deletion
hdfs dfs -count /lab_logs`,
    output: `Found 1 items
-rw-r--r--   1 user supergroup   24 2026-01-30 10:00 /lab_logs/log_data.txt

Deleted /lab_logs/log_data.txt`
  },
  {
    id: 4,
    shortTitle: "Word Count (MapReduce)",
    title: "Run a basic Word Count MapReduce program to understand MapReduce Paradigm.",
    aim: "To implement the MapReduce programming model by developing a Word Count application to count the occurrences of each word in a given input dataset.",
    procedure: [
      "Develop the Java MapReduce code (Mapper, Reducer, Driver).",
      "Compile the code and create a JAR file.",
      "Prepare an input text file with sample words.",
      "Upload the input file to HDFS.",
      "Run the job using: 'hadoop jar wc.jar WordCount <input_path> <output_path>'.",
      "Check the output directory in HDFS for the result."
    ],
    code: `import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

public class WordCount {

  public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>{
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();
    public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        word.set(itr.nextToken());
        context.write(word, one);
      }
    }
  }

  public static class IntSumReducer extends Reducer<Text,IntWritable,Text,IntWritable> {
    private IntWritable result = new IntWritable();
    public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
      int sum = 0;
      for (IntWritable val : values) sum += val.get();
      result.set(sum);
      context.write(key, result);
    }
  }
}
// Driver omitted (Standard boilerplate)`,
    output: `(Assuming Input: "Hello World Hello Hadoop")

Hadoop  1
Hello   2
World   1`
  },
  {
    id: 5,
    shortTitle: "Weather Data Analysis",
    title: "Write a map reduce program that mines weather data.\nWeather sensors collecting data every hour at many locations across the globe gather a large volume of log data, which is a good candidate for analysis with Map Reduce, since it is semi structured and record-oriented.",
    aim: "To design a MapReduce program that processes weather dataset logs to extract and compute the maximum temperature recorded for each year.",
    procedure: [
      "Obtain the NCDC weather dataset (or sample).",
      "Understand the data format (Chars 15-19: Year, Chars 87-92: Temp).",
      "Write a Mapper to extract Year and Temperature from each line.",
      "Filter out invalid readings (Missing = 9999) in Mapper.",
      "Write a Reducer to find the maximum temperature for each year.",
      "Run the MapReduce job on the weather data.",
      "View the output showing Max Temp per Year."
    ],
    code: `public class MaxTemperatureMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
  private static final int MISSING = 9999;
  
  public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
    String line = value.toString();
    String year = line.substring(15, 19);
    int airTemperature;
    if (line.charAt(87) == '+') { 
      airTemperature = Integer.parseInt(line.substring(88, 92));
    } else {
      airTemperature = Integer.parseInt(line.substring(87, 92));
    }
    String quality = line.substring(92, 93);
    if (airTemperature != MISSING && quality.matches("[01459]")) {
      context.write(new Text(year), new IntWritable(airTemperature));
    }
  }
}

public class MaxTemperatureReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
  public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
    int maxValue = Integer.MIN_VALUE;
    for (IntWritable value : values) {
      maxValue = Math.max(maxValue, value.get());
    }
    context.write(key, new IntWritable(maxValue));
  }
}`,
    output: `1901  317
1902  244
1903  289
1904  256
1905  283`
  },
  {
    id: 6,
    shortTitle: "Shortest Path (Graphs)",
    title: "Use MapReduce to find the shortest path between two people in a social graph.\nHint: Use an adjacency list to model a graph, and for each node store the distance from the original node, as well as a back pointer to the original node. Use the mappers to propagate the distance to the original node, and the reducer to restore the state of the graph. Iterate until the target node has been reached.",
    aim: "To demonstrate recursive MapReduce processing by implementing Breadth-First Search (BFS) to find the shortest path between nodes in a social network graph.",
    procedure: [
      "Define Node structure: NodeId, Distance, BackPointer, AdjacencyList.",
      "Initialize Source Node distance to 0 and all other nodes to Infinite.",
      "Implement Mapper to propagate distances to all neighboring nodes.",
      "Implement Reducer to select minimum distance and reconstruct node state.",
      "Iterate MapReduce jobs until the target node distance is finite or stable."
    ],
    code: `// Mapper Snippet
public void map(Text key, Text value, Context context) ... {
    Node node = new Node(value.toString());
    // Emit structure
    context.write(key, value); 
    
    // Propagate distance
    if (node.getDistance() != INFINITE) {
        for (String neighbor : node.getEdges()) {
            context.write(new Text(neighbor), new Text("DIST:" + (node.getDistance() + 1)));
        }
    }
}

// Reducer Snippet
public void reduce(Text key, Iterable<Text> values, Context context) ... {
    int minIds = INFINITE;
    Node originalNode = null;
    
    for (Text val : values) {
        if (val.toString().startsWith("DIST:")) {
           int d = Integer.parseInt(val.toString().split(":")[1]);
           if (d < minDist) minDist = d;
        } else {
           originalNode = new Node(val.toString());
        }
    }
    if (minDist < originalNode.getDistance()) {
        originalNode.setDistance(minDist);
    }
    context.write(key, originalNode.toText());
}`,
    output: `Iteration 1:
A  0  [B, C]
B  1  [D]
C  1  [E]

Iteration 2:
D  2  []
E  2  [F]`
  },
  {
    id: 7,
    shortTitle: "Friends-of-Friends",
    title: "Implement Friends-of-friends algorithm in MapReduce.\nHint: Two MapReduce jobs are required to calculate the FoFs for each user in a social network. The first job calculates the common friends for each user, and the second job sorts the common friends by the number of connections to your friends.",
    aim: "To identify and rank potential social connections by implementing a two-stage MapReduce algorithm that calculates common friends between users.",
    procedure: [
      "Process Input: Map user relationships into directed friend pairs.",
      "Identify common connections by emitting (FriendA, FriendB) -> CommonFriend.",
      "Aggregate common friend counts in the Reducer.",
      "Exclude existing direct friends from the recommendations.",
      "Sort and present the suggested friends by the number of common links."
    ],
    code: `public void map(LongWritable key, Text value, Context context) ... {
  // Input: User -> Friend1, Friend2, Friend3
  String[] parts = value.toString().split("->");
  String user = parts[0];
  String[] friends = parts[1].split(",");
  
  // 1. Mark direct friends
  for (String f : friends) {
      context.write(buildKey(user, f), new Text("DIRECT")); 
  }
  
  // 2. Emit potential common friends
  for (int i=0; i<friends.length; i++) {
      for (int j=i+1; j<friends.length; j++) {
          context.write(buildKey(friends[i], friends[j]), new Text(user)); // User is the common friend
      }
  }
}

public void reduce(Text key, Iterable<Text> values, Context context) ... {
    List<String> commonFriends = new ArrayList<>();
    boolean isDirect = false;
    for (Text val : values) {
        if (val.toString().equals("DIRECT")) isDirect = true;
        else commonFriends.add(val.toString());
    }
    if (!isDirect) {
        context.write(key, new Text(commonFriends.toString())); 
    }
}`,
    output: `User Pairs | Common Friends
(B, C)     | [A]
(B, D)     | [A]
(C, D)     | [A]`
  },
  {
    id: 8,
    shortTitle: "PageRank Implementation",
    title: "Implement an iterative PageRank graph algorithm in MapReduce.\nHint: PageRank can be implemented by iterating a MapReduce job until the graph has converged. The mappers are responsible for propagating node PageRank values to their adjacent nodes, and the reducers are responsible for calculating new PageRank values for each node, and for re-creating the original graph with the updated PageRank values.",
    aim: "To implement the PageRank algorithm using MapReduce to calculate the relative importance of nodes in a network based on link structure.",
    procedure: [
      "Initialize each node with an equal PageRank value (e.g., 1.0/N).",
      "Map node structure and distribute its PageRank share to out-links.",
      "Reduce by summing incoming PageRank shares and applying the damping factor.",
      "Preserve graph structure in both Map and Reduce phases.",
      "Iterate the process until node importance values converge."
    ],
    code: `// Mapper
public void map(LongWritable key, Text value, Context context) ... {
    Node node = parse(value);
    context.write(new Text(node.id), new Text(node.getStructure())); // Pass structure
    
    double prShare = node.pr / node.links.size();
    for (String link : node.links) {
        context.write(new Text(link), new Text(String.valueOf(prShare))); // Pass vote
    }
}

// Reducer
public void reduce(Text key, Iterable<Text> values, Context context) ... {
    double sum = 0;
    String structure = "";
    for (Text val : values) {
        if (isStructure(val)) structure = val.toString();
        else sum += Double.parseDouble(val.toString());
    }
    double newPr = 0.15 + 0.85 * sum; // Damping factor 0.85
    context.write(key, new Text(newPr + "\\t" + structure));
}`,
    output: `NodeA  0.45  NodeB,NodeC
NodeB  0.22  NodeC
(After multiple iterations)`
  },
  {
    id: 9,
    shortTitle: "Semi-Join (Bloom Filter)",
    title: "Perform an efficient semi-join in MapReduce.\nHint: Perform a semi-join by having the mappers load a Bloom filter from the Distributed Cache, and then filter results from the actual MapReduce data source by performing membership queries against the Bloom filter to determine which data source records should be emitted to the reducers",
    aim: "To optimize table joins in big data by implementing a Semi-Join using Bloom Filters in MapReduce to minimize data transfer overhead.",
    procedure: [
      "Construct a Bloom Filter from the smaller dataset (e.g., Paid Users).",
      "Distribute the Bloom Filter file to all Mappers using Distributed Cache.",
      "Load the Bloom Filter in the Mapper's setup phase.",
      "Filter the large dataset by checking membership against the Bloom Filter.",
      "Emit only qualifying records to the Reducer for the final join."
    ],
    code: `// Setup in Mapper
protected void setup(Context context) throws IOException {
    URI[] files = context.getCacheFiles();
    // Load local file to BloomFilter Object
    bloomFilter = loadFilter(files[0]); 
}

// Map
public void map(Object key, Text value, Context context) ... {
    String userId = extractUser(value);
    // Membership Test - Fast and local
    if (bloomFilter.membershipTest(new Key(userId.getBytes()))) {
        context.write(new Text(userId), value);
    }
}`,
    output: `// Setup: 
// 1. PaidUsers (Small Dataset): [UserA, UserC]
// 2. UserLogs (Large Dataset):
//    UserA -> Login
//    UserB -> Login
//    UserA -> Purchase
//    UserC -> Logout
//    UserB -> Purchase

// --- MAPREDUCE OUTPUT (Filtered Log) ---
UserA	Login
UserA	Purchase
UserC	Logout`
  },
  {
    id: 10,
    shortTitle: "Apache Pig Processing",
    title: "Install and Run Pig then write Pig Latin scripts to sort, group, join, project, and filter your data.",
    aim: "To process massive datasets using Apache Pig by writing Pig Latin scripts that perform relational operations like filtering, grouping, and joining.",
    procedure: [
      "Access the Pig shell (Grunts) in local or MapReduce mode.",
      "Load the raw dataset into a named relation.",
      "Apply FILTER transformation to prune records based on criteria.",
      "Use GROUP or COGROUP to organize data for aggregation.",
      "Transform schema using FOREACH ... GENERATE projections.",
      "Store or Dump the resulting relation to verify the pipeline."
    ],
    code: `-- Load
students = LOAD 'student_data.txt' USING PigStorage(',') AS (id:int, name:chararray, gpa:float, dept:chararray);

-- Filter
high_gpa = FILTER students BY gpa > 3.0;

-- Group
by_dept = GROUP high_gpa BY dept;

-- Project (Foreach)
names = FOREACH high_gpa GENERATE name, dept;

-- Store
DUMP by_dept;`,
    output: `(CSE,{(1,John,3.5,CSE)})
(ECE,{(2,Alice,3.8,ECE)})`
  },
  {
    id: 11,
    shortTitle: "Hive SQL Analysis",
    title: "Install and Run Hive then use Hive to create, alter, and drop databases, tables, views, functions, and indexes",
    aim: "To design a data warehouse solution using Apache Hive by creating tables, loading structured data, and performing SQL-like analytical queries.",
    procedure: [
      "Initialize Hive CLI or Beeline shell environment.",
      "Manage schema: CREATE and USE internal databases.",
      "Design target tables with appropriate column types and delimiters.",
      "Ingest data into Hive tables from local or HDFS files.",
      "Execute HiveQL queries for filtering and analytical reporting.",
      "Manage efficiency through Views and Indexing strategies."
    ],
    code: `CREATE DATABASE IF NOT EXISTS company;
USE company;

CREATE TABLE employee (
    id INT,
    name STRING,
    salary FLOAT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ',';

LOAD DATA LOCAL INPATH '/home/user/emp.csv' INTO TABLE employee;

SELECT name, salary FROM employee WHERE salary > 40000;`,
    output: `OK
Time taken: 0.12 seconds

John    45000.0
Alice   62000.0`
  }
];
