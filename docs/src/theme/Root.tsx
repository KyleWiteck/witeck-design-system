import { Stack } from '@peopleticker/magnit-design/components';
import { themeClass } from '@peopleticker/magnit-design/theme';
import { useEffect } from 'react';

// Adds theme class to app wrapper
function Root({ children }) {
  useEffect(() => {
    const className = themeClass;
    // Function to apply the class to the body
    const applyClass = () => {
      document.body.classList.add(className);
    };

    // Apply the class initially when the component mounts
    applyClass();

    // Create a MutationObserver to detect changes on the body tag
    const observer = new MutationObserver(() => {
      // Reapply the class when the body tag's class list changes
      if (!document.body.classList.contains(className)) {
        applyClass();
      }
    });

    // Start observing the body for attribute changes (class changes)
    observer.observe(document.body, {
      attributes: true, // Watch for attribute changes (like class changes)
      childList: false,
      subtree: false
    });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Stack gap="0" id="root" className={themeClass} minHeight="fullVH">
      {children}
    </Stack>
  );
}

export default Root;
