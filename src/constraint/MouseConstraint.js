/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class MouseConstraint
*/

var MouseConstraint = {};

(function() {

    /**
     * Description
     * @method create
     * @param {mouse} mouse
     * @return {MouseConstraint} A new MouseConstraint
     */
    MouseConstraint.create = function(mouse) {
        var constraint = Constraint.create({ 
            pointA: mouse.position,
            pointB: { x: 0, y: 0 },
            length: 0.01, 
            stiffness: 0.1,
            angularStiffness: 1,
            render: {
                strokeStyle: '#90EE90',
                lineWidth: 3
            }
        });

        return {
            mouse: mouse,
            dragBody: null,
            dragPoint: null,
            constraint: constraint
        };
    };

    /**
     * Description
     * @method update
     * @param {MouseConstraint} mouseConstraint
     * @param {body[]} bodies
     */
    MouseConstraint.update = function(mouseConstraint, bodies) {
        var mouse = mouseConstraint.mouse,
            constraint = mouseConstraint.constraint;

        if (mouse.button === 0) {
            if (!constraint.bodyB) {
                for (var i = 0; i < bodies.length; i++) {
                    var body = bodies[i];
                    if (Bounds.contains(body.bounds, mouse.position) 
                            && Vertices.contains(body.vertices, mouse.position)) {
                        constraint.pointA = mouse.position;
                        constraint.bodyB = body;
                        constraint.pointB = { x: mouse.position.x - body.position.x, y: mouse.position.y - body.position.y };
                        constraint.angleB = body.angle;
                        Sleeping.set(body, false);
                    }
                }
            }
        } else {
            constraint.bodyB = null;
            constraint.pointB = null;
        }

        if (constraint.bodyB) {
            Sleeping.set(constraint.bodyB, false);
            constraint.pointA = mouse.position;
        }
    };

})();