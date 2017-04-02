/*AI programming Project
 * John P Baggs and Mathew S. Renner
 * AINavigationMeshAgent class
 * This class will be used to construct a navigation mesh. It will serve as the
 * caller class for the methods used to construct teh navigation mesh.
 */

﻿
using UnityEngine;
using UnityEngine.UI;
using UnityEditor;
using System.Collections;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

public class AINavigationMeshAgent : MonoBehaviour
{
	
	//GameObject[] listOfObjects;
	//GameObject[] staticObjects;
	AIPolygonHolder surfacePolygonHolders; // array of polygons that are walkable
	//AIPolygon[] obstaclePolygons; // array of polygons that are not walkable
	//AIObjects[] objectsArray;
	public GameObject sphere; // used for debugging purposes
	//int staticCount;
	//Mesh[] objectMesh;
	//Mesh[] staticObjectMesh;
	//Mesh[] arrayOfComponents;
	int[] triangleArray; // array to hold default triangle polygons that all objects in unity are made of
	Vector3[] vectorArray;
	public static float agentDiameter; //the movement agent's diameter
	//public static float startTime; //the start time of this object
	public static Vector3 agentStart; //the starting position of the movement agent
	//public static float polygonLengthMin; //the Minimal length of a polygon in the navigation mesh
	//public static float polygonLengthAvg; //the average length of the polygons in the navigation mesh
	//public static bool loadNavigationMesh; //to tell if the user wants the navigation mesh loaded from a file
	//public static bool runSearch1000Times;
	//public static bool runAllSearchs;
	//string[] allSearchs;
	int positionToStart;
	//Vector3 goalPosition;
	//AISearch tempSearch;
	//string searchType;
	//bool runFromFile;

	// Use this for initialization
	[MenuItem("Custom/Export User NavMesh to file")]
	static void Export ()
	{
		new AINavigationMeshAgent ();
		//setupInitialValues ();
	}

	public AINavigationMeshAgent ()
	{
		setupInitialValues ();
		writeNavigationMeshToFile ();
	}

	/*public void  Start ()
	{
		setupInitialValues ();
		writeNavigationMeshToFile ();
	}*/


	/*
	 * setupInitialValue will set up the initial values for the instance variables
	 * Parameter:	none
	 * Return:	none
	 */
	void setupInitialValues ()
	{
		positionToStart = -1;

		//goalPosition = GameObject.FindGameObjectWithTag ("Goal").transform.TransformPoint (new Vector3 (0f, 0f, 0f));
		//listOfObjects = GameObject.FindGameObjectsWithTag ("Surface");
		//staticObjects = GameObject.FindGameObjectsWithTag ("Obstacle");
//		GameObject agent = GameObject.FindGameObjectWithTag ("Player");
		//agentStart = agent.transform.position;
		//agentDiameter = agent.GetComponent<CapsuleCollider> ().radius * 2;
		//	agentDiameter = agent.GetComponent<CapsuleCollider> ().radius;
		//objectMesh = new Mesh[listOfObjects.Length];
		//staticObjectMesh = new Mesh[staticObjects.Length];
		//objectsArray = new AIObjects[staticObjects.Length];
		surfacePolygonHolders = new AIPolygonHolder ();
		//allSearchs = new string[9];
		//allSearchs [0] = "A*";
		//allSearchs [1] = "A* Optimal";
		//allSearchs [2] = "Bi-Directional";
		//allSearchs [3] = "Bi-Directional Optimal";
		//allSearchs [4] = "FringeSearch";
		//allSearchs [5] = "Beam Search";
		//allSearchs [6] = "Dynamic Weighted A*";
		//allSearchs [7] = "Dynamic Weighted BDBOP";
		//allSearchs [8] = "Dynamic Weighted BDOP";
		//getObjectsArray ();
		getSurfacePolygonHolders ();
		//mergeSurfacePolygonHolders ();
	}





	/*
	 * doNavigationMethods method will start building the navigation mesh
	 * Parameter:	(string)searchTypeToRun is the search type that will be ran on the navigation mesh
	 * Return:	none
	 */
	public void doNavigationMethods (string searchTypeToRun)
	{
		/*searchType = searchTypeToRun;
		if (AINavigationMeshAgent.loadNavigationMesh == true)
			loadNavigationMeshFromFile ();
		else {


			startTime = Time.realtimeSinceStartup;
			positionToStart = 0;
			tempSearch = null;
			AINavigationMeshData.initialPolygonCount = getSurfacePolygonCount ();
			AINavigationMeshData.obstacleCount = staticObjects.Length;
			mergeSurfacePolygonHolders ();
			seperateEdgesIntoVectors ();
			getObjectsToSplitSurfacePolygons ();
			AINavigationMeshData.timeTaken = Time.realtimeSinceStartup - startTime;
			AINavigationMeshData.finalPolygonCount = getSurfacePolygonCount ();
			for (int count = 0; count < surfacePolygonHolders.Length; count++) {
				if (surfacePolygonHolders [count] != null)
					positionToStart = count;
			}
			writeNavigationMeshToFile();
		}	
		startTime = Time.realtimeSinceStartup;
		int searchTimes;
		if (AINavigationMeshAgent.runSearch1000Times == false) {
			searchTimes = 1;
			AISearch.canWalk = true;
		} else {
			AISearch.canWalk = false;
			searchTimes = 1000;
		}
		if (AINavigationMeshAgent.runAllSearchs == true) {
			AISearch.canWalk = false;
			for (int count = 0; count < 9; count++) {
				searchType = allSearchs [count];
				for (int count2 = 0; count2 < searchTimes; count2++) {
					doAISearchMethods ();
					writeAfterDataToFile ();
				}
			}
		} else {
			for (int count = 0; count < searchTimes; count++) {
				doAISearchMethods ();
				writeAfterDataToFile ();
			}
		}*/
	}


	/*
	 * writeNavigationMeshToFile method will serialize the data for a navigation mesh and write it all do a file
	 * Parameters:	none
	 * Return:	none
	 */
	void writeNavigationMeshToFile ()
	{
		AIPolygon[] polygons = surfacePolygonHolders.getPolygons ();
		/*AIPolygonHolderData dataHolder = new AIPolygonHolderData ();
		dataHolder.polygonData = new AIPolygonData[polygons.Length];
		for (int count = 0; count < polygons.Length; count++) {
			float[,] vertices = new float[polygons [count].getVerticesCount (), 3];
			for (int count2 = 0; count2 < polygons[count].getVerticesCount(); count2++) {
				Vector3 vertex = polygons [count].getVectorAtIndex (count2);
				vertices [count2, 0] = vertex.x;
				vertices [count2, 1] = vertex.y;
				vertices [count2, 2] = vertex.z;
			}
			dataHolder.polygonData [count] = new AIPolygonData ();
			dataHolder.polygonData [count].vertices = vertices;
			dataHolder.polygonData [count].neighborCount = polygons [count].getNeighborsHeld ();
			dataHolder.polygonData [count].neighbors = polygons [count].getNeighbors ();
			dataHolder.polygonData [count].gotGoal = polygons [count].getHasGoal ();
			dataHolder.polygonData [count].gotAgent = polygons [count].getHasAgent ();
			dataHolder.polygonData [count].id = polygons [count].getID ();
		}

		string filePath = Application.dataPath + "/" + Path.GetFileNameWithoutExtension (EditorApplication.currentScene) + "UserNavMesh.dat";
		Stream writer = File.Create (filePath);
		BinaryFormatter serializer = new BinaryFormatter ();
		serializer.Serialize (writer, dataHolder);
		Debug.Log ("NavMesh exported as '" + filePath + "'");
		writer.Close ();*/

		string data = "";
		data += polygons.Length + "\n";
		int debugCounter = 0;
		for (int counter = 0; counter < polygons.Length; counter++) {
			float[,] vertices = new float[polygons [counter].getVerticesCount (), 3];
			data += polygons [counter].getVerticesCount () + "\n";
			for (int count3 = 0; count3 < polygons[counter].getVerticesCount(); count3++) {
				Vector3 vertex = polygons [counter].getVectorAtIndex (count3);
				data += vertex.x + "\n" + vertex.y + "\n" + vertex.z + "\n";
			}
			data += polygons [counter].getNeighborsHeld () + "\n";
			int[] neighbors = polygons [counter].getNeighbors ();
			for (int count3 = 0; count3 < neighbors.Length; count3++) {
				data += neighbors [count3] + "\n";
			}
			//data += "\n";
			data += polygons [counter].getID () + "\n";
		}
		using (StreamWriter sw = new StreamWriter(Application.dataPath + "/" + Path.GetFileNameWithoutExtension (EditorApplication.currentScene) + "UserNavMesh.obj")) {
			sw.Write (data);
			Debug.Log (data);
		}
	}



	/*
	 * loadNavigationMeshFromFile method will load all the data for the navigation mesh from the file
	 * Paramters:	none
	 * Return:	none
	 */
	public void loadNavigationMeshFromFile ()
	{
		/*//startTime = Time.realtimeSinceStartup;
		string filePath = Application.loadedLevelName + "NavigationMesh.dat";
		Stream TestFileStream = File.OpenRead(filePath);
		BinaryFormatter deserializer = new BinaryFormatter();
		positionToStart = 0;
		AIPolygonHolderData dataholder = (AIPolygonHolderData)deserializer.Deserialize(TestFileStream);
		AIPolygon[] polygons = new AIPolygon[dataholder.polygonData.Length];
		for (int count = 0; count < dataholder.polygonData.Length; count++) {
			Vector3[] vertices = new Vector3[dataholder.polygonData [count].vertices.Length / 3];
			int id = dataholder.polygonData [count].id;
			int[] neighbors = dataholder.polygonData [count].neighbors;
			int neighborsHeld = dataholder.polygonData [count].neighborCount;
			bool gotGoal = dataholder.polygonData [count].gotGoal;
			bool gotAgent = dataholder.polygonData [count].gotAgent;
			for (int count2 = 0; count2 < vertices.Length; count2++)
				vertices [count2] = new Vector3 (dataholder.polygonData [count].vertices [count2, 0], dataholder.polygonData [count].vertices [count2, 1], dataholder.polygonData [count].vertices [count2, 2]);
			polygons [count] = new AIPolygon ();
			polygons [count].setData (vertices, id, neighborsHeld, neighbors, gotGoal, gotAgent);
		}
		AINavigationMeshData.initialPolygonCount = getSurfacePolygonCount ();
		AINavigationMeshData.obstacleCount = staticObjects.Length;
		surfacePolygonHolders = new AIPolygonHolder[1];
		surfacePolygonHolders [0] = new AIPolygonHolder ();
		surfacePolygonHolders [0].setAll (polygons, polygons.Length);
		positionToStart = 0;
		AINavigationMeshData.timeTaken = Time.realtimeSinceStartup - startTime;
		AINavigationMeshData.finalPolygonCount = getSurfacePolygonCount ();
		TestFileStream.Close();*/

	}



	/*
	 * writeAfterDataToFile method will write all the data from the navigation mesh and the search agent to the 
	 * 		end of the file
	 * parameters:	none
	 * return:	none
	 */
	/*void writeAfterDataToFile ()
	{
		string filePath = "data.txt";
		StreamReader inputStream = new StreamReader(filePath);
		string tempString = "";
		tempString += inputStream.ReadToEnd();
		tempString += "\n";
		inputStream.Close ();
		tempString += Application.loadedLevelName + "\t";
		if (AINavigationMeshAgent.loadNavigationMesh == true)
			tempString += "load Navigation Mesh\t";
		else
			tempString += "build Navigation Mesh\t";
		tempString += AINavigationMeshData.timeTaken + "\t";
		tempString += AINavigationMeshData.initialPolygonCount + "\t";
		tempString += AINavigationMeshData.obstacleCount + "\t";
		tempString += AINavigationMeshData.finalPolygonCount + "\t";
		tempString += AISearchAgentData.searchType + "\t";
		tempString += AISearchAgentData.timeTaken + "\t";
		tempString += AISearchAgentData.nodesVisited + "\t";
		tempString += AISearchAgentData.maxQueueSize + "\t";
		tempString += AISearchAgentData.finalPathLength + "\t";
		tempString += AISearchAgentData.finalPathCost + "\t";
		StreamWriter writer = new StreamWriter (filePath);
		writer.Write (tempString);
		writer.Close ();

		
		
	}*/

	/*
	 * doAISearchMethods will make a search agent to start searching though the navigation mesh
	 * Parameter:	none
	 * Return:	none
	 */
	/*void doAISearchMethods()
	{

			AINavigationMeshAgent.polygonLengthMin = surfacePolygonHolders [positionToStart].getMinPolygonLength ();
			AINavigationMeshAgent.polygonLengthAvg = surfacePolygonHolders [positionToStart].getAveragePolygonLength ();
			if (positionToStart != -1)
				tempSearch = new AISearch (searchType, goalPosition, surfacePolygonHolders [positionToStart].getPolygons ());
			if (tempSearch != null) {
				Vector3[] vertices = tempSearch.getWayPoints ();
				if (vertices != null)
					for (int count = 0; count < vertices.Length; count++)
						Instantiate (sphere, vertices [count], new Quaternion (0f, 0f, 0f, 0f));
			}
	}*/



	/* getObjectsArray gets all the triangle polygons that compose all objects in a Unity map,
	 * and loads them into the triangleArray. Then creates new AIObjects from those triangles and loads
	 * them into objectsArray to be used for nav mesh construction.
	 * Parameters: none
	 * Return: none
	 */
	/*void getObjectsArray ()
	{
		Vector3[] WorldPositionArray = new Vector3[3];
		for (int count = 0; count < staticObjects.Length; count++) {
			staticObjectMesh [count] = staticObjects [count].GetComponent<MeshFilter> ().mesh;
			vectorArray = staticObjectMesh[count].vertices;
			triangleArray = staticObjectMesh[count].GetTriangles (0);
			objectsArray[count] = new AIObjects(triangleArray.Length/3, staticObjects[count]);
			for (int count1 = 0, count2 = 1, count3 = 2; count1 < triangleArray.Length; count1 += 3, count2 += 3, count3 += 3) {
				WorldPositionArray [0] = staticObjects [count].transform.TransformPoint (vectorArray [triangleArray [count1]]);
				WorldPositionArray [1] = staticObjects [count].transform.TransformPoint (vectorArray [triangleArray [count2]]);
				WorldPositionArray [2] = staticObjects [count].transform.TransformPoint (vectorArray [triangleArray [count3]]);
				objectsArray[count].addPolygon(WorldPositionArray);
			}
		}
	}*/




	/* getSurgavePolygonHolders gets all the triangle polygons that compose all objects in a Unity map,
	 * and loads them into the triangleArray. Then creates new AIObjects from those triangles out of the walkable
   	 * polygons and loads them into surfacePolygonHolders to be used for nav mesh construction.
	 * Parameters: none
	 * Return: none
	 */
	void getSurfacePolygonHolders ()
	{
		Vector3[] WorldPositionArray = new Vector3[3];
		NavMeshTriangulation triangulatedNavMesh = NavMesh.CalculateTriangulation ();
		
		//Mesh mesh = new Mesh ();
		//mesh.vertices = triangulatedNavMesh.vertices;
		//mesh.triangles = triangulatedNavMesh.indices;
		vectorArray = triangulatedNavMesh.vertices;
		triangleArray = triangulatedNavMesh.indices;
		surfacePolygonHolders = new AIPolygonHolder (triangleArray.Length / 3);
			
		for (int count1 = 0, count2 = 1, count3 = 2; count1 < triangleArray.Length; count1 += 3, count2 += 3, count3 += 3) {
			WorldPositionArray [0] = vectorArray [triangleArray [count1]];
			WorldPositionArray [1] = vectorArray [triangleArray [count2]];
			WorldPositionArray [2] = vectorArray [triangleArray [count3]];
			//if (checkVertex (WorldPositionArray) == false) {
			surfacePolygonHolders.addPolygon (WorldPositionArray);
			//}
		}
	}



	/*
	 * getSurfacePolygonCount will return the number of polygons that are in every surfacePolygonholder added to gether
	 * Parameter:	none
	 * Return:	(int)
	 * 			the number of surface polygons in the surfacePolygonHolders
	 */
	/*int getSurfacePolygonCount()
	{
		int counter = 0;
		for (int count = 0; count < surfacePolygonHolders.Length; count++) {
			if (surfacePolygonHolders [count] != null)
				counter += surfacePolygonHolders [count].getPolygonsHeld ();
		}
		return counter;
	}*/


	/* mergeSurfacePolygonsHolders calls the merge function to merge all the polygons in
	 * the surfacePolygonHolders array.
	 * Parameters: none
	 * Return: none
	 */
	void mergeSurfacePolygonHolders ()
	{

		surfacePolygonHolders.merge ();

		
		/*for (int count = surfacePolygonHolders.Length - 1; count >= 0; count--) {
			if (surfacePolygonHolders [count] != null) {
				for (int count2 = surfacePolygonHolders.Length - 1; count2 >= 0; count2--) {
					if (surfacePolygonHolders [count2] != null && count != count2) {
						surfacePolygonHolders [count] = surfacePolygonHolders [count].mergePolygonHolder (surfacePolygonHolders [count2]);
						surfacePolygonHolders [count2] = null;
					}
				}
			}
		}*/
		/*int counter = 0;
		for (int count = 0; count < surfacePolygonHolders.Length; count++)
			if (surfacePolygonHolders [count] != null)
				counter++;*/

		/*AIPolygonHolder[] tempArray = new AIPolygonHolder[counter];

		for (int count = 0, tempCount = 0; count < surfacePolygonHolders.Length; count++) {
			if (surfacePolygonHolders [count] != null) {
				tempArray [tempCount] = surfacePolygonHolders [count];
				tempCount++;
			}
		}*/

	}
	
	/* seprateEdgesIntoVectors calls seprateEdgesIntoVectors from the surfaccePolyongHolders
	 * class for the polygons in the surfacePolygonHolders array.
	 * Paramters: none
	 * Return: none
	 */
	void seperateEdgesIntoVectors ()
	{
		surfacePolygonHolders.seperateEdgesIntoVectors ();
	}
	
	/* getObjectsToSplitSurfacePolygons calls the ObjectsToSplitPolygon method from the
	 * AIPolygonHolder class on all polygons in the surfaccePolyongHolders array
	 * Parameters: none
	 * Return: none
	 */
	/*void getObjectsToSplitSurfacePolygons ()
	{
		for (int count = 0; count < surfacePolygonHolders.Length; count++)
			if (surfacePolygonHolders [count] != null)
				surfacePolygonHolders [count].ObjectsToSplitPolygon (objectsArray, GameObject.FindGameObjectWithTag("Agent").GetComponent<CapsuleCollider> ().radius);
	}*/
	
	/* Update calls the drawPolygons method from the AIPolygonHolder class on all polygons in
	 * the surfaccePolyongHolders array.
	 * Parameters: none
	 * Return: none
	 */
	void Update ()
	{
		//surfacePolygonHolders.drawPolygons ();
		//for (int count = 0; count < surfacePolygonHolders.getPolygonsHeld(); count++) {
		//for (int count2 = 0; count2 < surfacePolygonHolders.getPolygonAtIndex(count).getNeighborsHeld(); count2++)
		//	surfacePolygonHolders.getPolygonAtIndex (surfacePolygonHolders.getPolygonAtIndex (count).getNeighborAt (count2)).drawSelf (Color.yellow);
		//	surfacePolygonHolders.getPolygonAtIndex (count).drawSelf (Color.red);
		//}

	}


	
	/* checkVertex determines if the polygon is walkable or not by examining its normal vector.
	 * Parameter: (Vector3[]) VerticesToCheck is an array of vertices that make up a singel polygon.
	 * Return: (bool)
	 *						true if the polygon is walkable
	 *						false if the polygon is not walkable
	 */
	bool checkVertex (Vector3[] VerticesToCheck)
	{
		Vector3 side1 = VerticesToCheck [0] - VerticesToCheck [2];
		Vector3 side2 = VerticesToCheck [1] - VerticesToCheck [2];
		Vector3 finalVertex = Vector3.Cross (side1, side2);
		finalVertex /= finalVertex.magnitude;
		
		if (finalVertex.x > .00001f || finalVertex.x < -.00001f)
			return true;
		if (finalVertex.z > .00001f || finalVertex.z < -.00001f)
			return true;
		if (finalVertex.y.Equals (1.0f) == false)
			return true;
		return false;
	}
	
}
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
