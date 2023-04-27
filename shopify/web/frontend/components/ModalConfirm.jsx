import { Button, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";

export function ModalConfirm({ confirmModal, setConfirmModal }) {
  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={confirmModal.isOpen}
        onClose={() => {
          setConfirmModal({ ...confirmModal, isOpen: false });
        }}
        title={confirmModal.title}
        primaryAction={{
          content: confirmModal.contentAction,
          onAction: () => {
            console.log("confirm", confirmModal);
            setConfirmModal({
              ...confirmModal,
              loading: true,
            });
            confirmModal.onConfirm();
          },
          destructive: true,
          //   loading: confirmModal.loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setConfirmModal({ ...confirmModal, isOpen: false });
            },
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>{confirmModal.subTitle}</TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
