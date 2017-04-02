#pragma strict

public class AIPolygon extends MonoBehaviour {

	public var vertices : Vector3[] = new Vector3[3];
	public var verticesCount : int;
	public var neighbors : int[];
	public var neighborsHeld : int;
	public var id : int;
	
	
	/*Vector3[] vertices; //this holds the vertices for this polygon
	Vector3[] scaledVertices;
	int[] neighborIndices; // this holds the neighbors of this polygon
	int neighborsHeld; // this indicates how many neighbors this polygon has
	public int id; // the index in the AIPolygonHolder this polygon is placed
	Vector3[] edgeVectors; // an array of Vector3s that are the vectors on the edges of this polygon
	int edgeVectorsCount;  //number of edge vectors being held
	int MAXEDGECOUNT = 31; // max number to split each edge
//	AIObjects[] objectsToSplitThis; // an array that olds objects that are in this polygon
//	Vector3[,] objectToSplitVertices; //an array of edges that make up an object that is in the polygon
	Vector3 pointToDraw;
	AIPolygonQueue freePolygonQueue; // a queue that will hold only the free polygons after a split
	bool hasGoal; // variable to see if this polygon has the goal in it
	bool hasAgent; // variable to see if this polygon has the agent in it
	string objectString;*/
	
	public function AIPolygon(vertices : Vector3[], verticesCount : int, neighbors : int[], neighborsHeld : int, id : int) {
		this.vertices = vertices;
		this.verticesCount = verticesCount;
		this.neighbors = neighbors;
		this.neighborsHeld = neighborsHeld;
		this.id = id;
	}
	
	public function drawSelf(color : Color)
	{
		for (var count : int = 0; count < vertices.Length; count++) {
				if (count == (vertices.Length - 1)) { //makes the wrap around happen
					Debug.DrawLine (vertices [count], vertices [0], color); //draws a line that can be seen in the game mode and in scene mode
				} else {
					Debug.DrawLine (vertices [count], vertices [count + 1], color);
				}
			}
	}
}