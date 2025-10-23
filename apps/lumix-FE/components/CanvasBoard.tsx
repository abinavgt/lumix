import { Stage, Layer, Rect, Arrow, Line } from "react-konva";
import { useState } from "react";
import { Button } from "./ui/button";

export const CanvasBoard = () => {
    const [shapes, setShapes] = useState<any[]>([]);
    const [tool, setTool] = useState("pen");
    const [drawing, setDrawing] = useState(false);

    const handleMouseDown = (e: any) => {
        setDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        if (tool === "pen") {
            setShapes([...shapes, { tool, points: [pos.x, pos.y] }]);
        }
    };

    const handleMouseMove = (e: any) => {
        if (!drawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastShape = shapes[shapes.length - 1];
        if (tool === "pen") {
            lastShape.points = lastShape.points.concat([point.x, point.y]);
            shapes.splice(shapes.length - 1, 1, lastShape);
            setShapes([...shapes]);
        }
    };

    const handleMouseUp = () => setDrawing(false);

    return (
        <>
            <div className="p-2 flex gap-2">
                <button onClick={() => setTool("pen")}>✏️ Draw</button>
                <button className="bg-amber-200" onClick={() => setTool("rect")}>⬛ Rectangle</button>
            </div>

            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 100}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {shapes.map((shape, i) => {
                        if (shape.tool === "pen") {
                            return (
                                <Line
                                    key={i}
                                    points={shape.points}
                                    stroke="black"
                                    strokeWidth={2}
                                    tension={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                />
                            );
                        }

                        if (shape.tool === 'rect') {
                            return (
                                <Rect
                                    key={i}
                                    x={20}
                                    y={50}
                                    width={100}
                                    height={100}
                                    fill="red"
                                    shadowBlur={10}
                                />
                            )
                        }
                        return null;

                    })}
                    <Button>
                        <Rect
                            x={20}
                            y={50}
                            width={100}
                            height={100}
                            fill="red"
                            draggable={true}
                            shadowBlur={10}
                        />
                    </Button>
                    <Arrow
                            x={20}
                            y={50}
                            width={100}
                            height={100}
                            points={[100, 0, 100, 100]}
                            fill="red"
                            draggable={true}
                            shadowBlur={10}
                    />
                </Layer>
            </Stage>
        </>
    );
}
