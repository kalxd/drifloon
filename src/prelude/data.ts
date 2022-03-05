/**
 * 基本常量定义。
 */

export type Color = "primary" | "info" | "success" | "warning" | "danger";

export type Size = "small" | "normal" | "medium" | "large";

/**
 * 转化成bulma基本的class形式。
 */
export type IsBulmaClass<T extends string> = `is-${T}`;
