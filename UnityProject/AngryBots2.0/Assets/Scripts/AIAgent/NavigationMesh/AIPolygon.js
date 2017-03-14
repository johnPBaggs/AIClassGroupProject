#pragma strict

public class AIPolygon extends MonoBehaviour {

	public var vertices : Vector3[] = new Vector3[3];
	
	public function setTriangle(one : Vector3, two : Vector3, three : Vector3) {
		vertices[0] = one;
		vertices[1] = two;
		vertices[2] = three;
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