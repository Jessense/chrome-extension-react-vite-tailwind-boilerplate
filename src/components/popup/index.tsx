import './popup.css';
import { Button } from '@/components/ui/button.tsx';
import { CircleHelp, Settings } from 'lucide-react';
import CardSwitch from '@/components/ui/card-switch.tsx';
import { useSettings } from '@/hooks/useSettings.tsx';
import SafeImage from '@/components/ui/safe-image.tsx';
import iconLight from '@/assets/images/icon-light.png';
import iconDark from '@/assets/images/icon-dark.png';

export default function Popup() {
  const { settings, setSettings } = useSettings();

  const handleOpenSidePanel = () => {
    console.log('open side panel');
    chrome.windows.getCurrent({ populate: false }, (currentWindow) => {
      if (currentWindow?.id !== undefined) {
        chrome.sidePanel
          .open({ windowId: currentWindow.id })
          .catch((error) => console.error('Failed to open side panel:', error));
      } else {
        console.error('Could not determine the current window.');
      }
    });
    window.close();
  };

  return (
    <div className="ext-h-96 ext-w-80 ext-bg-white ext-flex ext-flex-col ext-border-0 ext-p-0 ext-m-0">
      <div className="ext-w-full ext-h-full ext-flex ext-flex-col ext-justify-between ext-py-3 ext-px-3 ext-bg-background ext-text-foreground">
        {/* HEADER */}
        <div className="ext-flex ext-flex-row ext-justify-between ext-items-center">
          <div className="ext-flex">
            <div className="ext-flex ext-flex-row ext-items-center">
              <SafeImage className="ext-pl-3" width={40} src={settings.theme === 'dark' ? iconLight : iconDark} />
              <p
                className={`ext-text-center ext-text-lg ext-ml-2 ext-font-black ${settings.theme === 'dark' ? 'ext-text-white' : 'ext-text-black'}`}
              >
                Extension
              </p>
            </div>
          </div>
          <div className="ext-flex">
            <Button size="xs" variant="ghost" onClick={() => chrome?.runtime?.openOptionsPage()}>
              <Settings size={12} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="ext-flex ext-flex-col ext-gap-3 ext-flex-1 ext-overflow-y-auto ext-my-4">
          <CardSwitch
            title={'Dark Mode'}
            checked={settings.theme === 'dark'}
            onChecked={(checked) => setSettings({ theme: checked ? 'dark' : 'light' })}
            subtitle={'Switch between dark mode applied to all extension modules.'}
          />
          <Button 
            onClick={handleOpenSidePanel}
            className="ext-w-full"
          >
            Open Side Panel
          </Button>
        </div>

        {/* FOOTER */}
        <div className="ext-flex">
          <div className="ext-flex ext-flex-row ext-justify-between ext-items-center ext-w-full">
            <Button size="xs" variant="ghost">
              <CircleHelp size={12} />
            </Button>
            <p className="ext-text-xs">Version {chrome?.runtime?.getManifest().version}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
