#pragma strict

public class AIAgentSteering extends MonoBehaviour {

	public var angular : float;
	public var linear : Vector3;
	
	public function AIAgentSteering() {
		angular = 0.0;
		linear = new Vector3();
	}
}