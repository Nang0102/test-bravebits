import { Toast, Frame, Page, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function ToastMessage({ toast, setToast }) {
  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Toast
          content={toast.message}
          onDismiss={() => setToast({ ...toast, isOpen: false })}
        />
      </Frame>
    </div>
  );
}
