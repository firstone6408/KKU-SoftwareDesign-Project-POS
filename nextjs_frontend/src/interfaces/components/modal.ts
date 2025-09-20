export interface ModalType {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}
