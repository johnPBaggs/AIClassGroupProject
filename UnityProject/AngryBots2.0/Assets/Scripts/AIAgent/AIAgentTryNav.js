#pragma strict


/*
 * This class will use the Unity navigationMesh to move the Agent from target to target
 *	This class can also stop the navigationMesh to allow for free movement of the Agent
 */
public class AIAgentTryNav extends MonoBehaviour {

	public var target : Transform; //the transform of the current target for the navigationMesh
	public var destination : Vector3;
	
	
	public var isGoingToTarget : boolean;
	public var isFleeing : boolean;
	public var isStopped : boolean;
	

	//used to check if the agent is stuck or not
	public var timeSinceStop : float;
	/*private var timeSinceStuck : float;
	private var timeSinceChanged : float;
	private var changed : boolean;
	private var playerLastPosition : Vector3;
	private var stuckPosition : Vector3;*/
	
	//public var canMove : boolean = true;

	//used to tell if the navigationMesh is stopped or moving
	//public var stopped : boolean;

	//the navigationMesh for the Agent
	var navMeshAgent : NavMeshAgent;
	
	public var agentBehaviour : AIAgentBehaviour;
	public var targetScript : AiAgentTargetList; //An object for the targetList class
	public var agentCollider : AgentCollider;
	
	//for Fleeing 
	public var navHit : NavMeshHit;
	public var fleeTarget : Transform;
	public var directionToEnemy : Vector3;
	public var fleeRange : float = 25;
	public var checkRate : float;
	public var nextCheck : float;


	//debug
	public var sphere : GameObject;

	//This function is called at the very beginning before any other function
	//	This is used to set the initial variables
	function Start () {
		//playerLastPosition = transform.position;
		navMeshAgent.updateRotation = false;
		targetScript.findClosestTarget();
		isStopped = false;
		isFleeing = false;
		isGoingToTarget = true;
	}
	
	function Awake() {
		agentBehaviour = gameObject.GetComponent.<AIAgentBehaviour>();
		agentCollider = gameObject.GetComponent.<AgentCollider>();
		checkRate = Random.Range(0.3, 0.4);
	}


	//This function is called once every frame and is used to see if the Agent's navigationMesh needs
	//	to stop becuase it is at the target or not
	function Update () {
	
		if(isFleeing) {
			if(target == null) {
				setFleeTarget();
			}
			checkIfIShouldFlee();	
		} else if(isGoingToTarget) {
			if(target == null)
				setNewDestination();
			if(isStopped) {
				if(Time.time - timeSinceStop > 2) {
					targetScript.setCurrent();
					resume();
					//agentBehaviour.isStopped = true;
					isStopped = false;
				} 
			} else {
				if(Vector3.Distance(transform.position, target.position) < 5 && isStopped == false) {
					stop();
					timeSinceStop = Time.time;
					isStopped = true;
					agentBehaviour.navMeshAgentIsMoving = false;
				}
			}
		}
		
		/*targetScript.findClosestTarget();

			if(Time.time - timeSinceStop > 2) {
				targetScript.setCurrent();
				
				stopped = false;
			}
		} else
			if(Vector3.Distance(transform.position, targetScript.closestTarget) < 5 && stopped == false) {
				stop();
				timeSinceStop = Time.time;
				agentBehaviour.navMeshAgentIsMoving = false;
				
			} else {
				//setNewDestination();
				}
		}*/
	}

	//Going To A Target Functions

	//This function will set a new destination for the navigationMesh
	public function setNewDestination() {
		if(targetScript.closestTargetIndex != -1) {
			target = targetScript.closestTarget;
			navMeshAgent.SetDestination(target.position);

		}
		else {
			navMeshAgent.SetDestination(transform.position);
			target = transform;
		}
	}


	

	//This function will stop the navigationMesh
	public function stop() {
		if(gameObject.GetComponent.<NavMeshAgent>()) {
			//navMeshAgent.velocity = Vector3.zero;
			navMeshAgent.Stop(true);
			//canMove = false;
		}
	}


	//This function will allow the navigationMesh to start again
	public function resume() {
		if(gameObject.GetComponent.<NavMeshAgent>()) {
			navMeshAgent.Resume();
			//canMove = true;
		}
	}
	
	public function goingToTarget() {
		isGoingToTarget = true;
	}
	
	public function notGoingToTarget() {
		isGoingToTarget = false;
		target = null;
		navMeshAgent.SetDestination(transform.position);
		//navMeshAgent.Resume();
	}
	
	//Flee Functions
	public function setFleeTarget() {
		fleeTarget = agentCollider.currentTopOfList;
	}
	
	public function iShouldFlee () {
		isFleeing = true;
	}
	
	public function iShouldStopFleeing() {
		isFleeing = false;
		target = null;
		navMeshAgent.SetDestination(transform.position);
		//navMeshAgent.Resume();
	}
	
	
	function checkIfIShouldFlee() {
		if(isFleeing) {
			if(fleeTarget != null) {
				if(FleeTarget() && Vector3.Distance(transform.position, fleeTarget.position) < fleeRange) {
					Debug.Log("HERERERER");
					
					navMeshAgent.SetDestination(destination);
					//navMeshAgent.Resume();
					//Instantiate (sphere, destination, new Quaternion (0f, 0f, 0f, 0f));
					
					//navMeshAgent.Resume();
				}
			}
		}
	}
	
	function FleeTarget() : boolean {
		directionToEnemy = transform.position - fleeTarget.position * 2;
		var checkPos : Vector3 = transform.position + directionToEnemy;
		var done : boolean = false;
		var something : float = 1.0;
		var path : NavMeshPath = new NavMeshPath();
		while(!done) {
		if (NavMesh.SamplePosition(checkPos, navHit, something, NavMesh.AllAreas)) { 
			destination = navHit.position;
			//destination.y = 0;
			if(navMeshAgent.CalculatePath(destination, path))
			Debug.Log("true");
			done = true;
			return true;
		} 
		something *= 1.5;
		}
	}

}
