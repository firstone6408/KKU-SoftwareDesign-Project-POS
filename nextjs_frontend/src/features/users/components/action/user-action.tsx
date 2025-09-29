"use client";

import { useModal } from "@/hooks/use-modal";
import { IUser } from "../../schemas/user.schema";
import { UpdateUserModal } from "./update-user-modal";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { DeleteUserButton } from "./delete-user-button";

interface UserActionProps {
  user: IUser;
}

export function UserAction({ user }: UserActionProps) {
  const updateUserModal = useModal<IUser>();

  return (
    <>
      {/* Button */}
      <div className="flex gap-2 justify-center">
        <Button onClick={() => updateUserModal.openModal(user)}>
          <Pen />
        </Button>

        <DeleteUserButton
          user={user}
          variant={"destructive"}
          icon={Trash}
        />
      </div>

      {/* Modal */}
      <UpdateUserModal
        key={updateUserModal.selected?.id}
        open={updateUserModal.isOpen}
        onOpenChange={updateUserModal.setIsOpen}
        onClose={updateUserModal.closeModal}
        user={updateUserModal.selected}
      />
    </>
  );
}
