import { genMapping } from "./prelude/Fn";

/**
 * 通用常量
 */
export enum Size {
	Mini,
	Tiny,
	Small,
	Large,
	Huge,
	Massive
}

export const showSize = genMapping({
	[Size.Mini]: "mini",
	[Size.Tiny]: "tiny",
	[Size.Small]: "small",
	[Size.Large]: "large",
	[Size.Huge]: "huge",
	[Size.Massive]: "massive"
});

export enum Wide {
	One,
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Eleven,
	Twelve,
	Thirteen,
	Fourteen,
	Fifteen,
	Sixteen
}

export const showWide = genMapping({
	[Wide.One]: "one",
	[Wide.Two]: "two",
	[Wide.Three]: "three",
	[Wide.Four]: "four",
	[Wide.Five]: "five",
	[Wide.Six]: "six",
	[Wide.Seven]: "seven",
	[Wide.Eight]: "eight",
	[Wide.Nine]: "nine",
	[Wide.Ten]: "ten",
	[Wide.Eleven]: "eleven",
	[Wide.Twelve]: "twelve",
	[Wide.Thirteen]: "thirteen",
	[Wide.Fourteen]: "fourteen",
	[Wide.Fifteen]: "fifteen",
	[Wide.Sixteen]: "sixteen"
});

export enum Color {
	Red,
	Orange,
	Yellow,
	Olive,
	Green,
	Teal,
	Blue,
	Violet,
	Purple,
	Pink,
	Brown,
	Grey,
	Black
}

export const showColor = genMapping({
	[Color.Red]: "red",
	[Color.Orange]: "orange",
	[Color.Yellow]: "yellow",
	[Color.Olive]: "olive",
	[Color.Green]: "green",
	[Color.Teal]: "teal",
	[Color.Blue]: "blue",
	[Color.Violet]: "violet",
	[Color.Purple]: "purple",
	[Color.Pink]: "pink",
	[Color.Brown]: "brown",
	[Color.Grey]: "grey",
	[Color.Black]: "black"
});

export enum Align {
	Left,
	Center,
	Right,
	Justified
}

export const showAlign = genMapping({
	[Align.Left]: "left aligned",
	[Align.Center]: "center aligned",
	[Align.Right]: "right aligned",
	[Align.Justified]: "justified"
});

export enum Float {
	Left,
	Right
}

export const showFloat = genMapping({
	[Float.Left]: "left floated",
	[Float.Right]: "right floated"
});

export enum AttachPosition {
	Top,
	Bottom
}

export const showAttachPosition = genMapping({
	[AttachPosition.Top]: "top attached",
	[AttachPosition.Bottom]: "bottom attached"
})
