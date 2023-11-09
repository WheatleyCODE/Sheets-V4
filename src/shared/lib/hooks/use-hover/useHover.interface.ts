export interface IUseHoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export type UseHoverResult = [boolean, IUseHoverBind];
