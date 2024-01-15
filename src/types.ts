
export type Tool = "pen" | "eraser";

export interface ILine {
    tool: Tool;
    points: number[];
}

export interface IShape {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
}

export interface IShapeType {
    value: string;
    label: string;
}