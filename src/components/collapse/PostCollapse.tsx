import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Box, Collapse } from "@mantine/core";

type PostCollapseProps = {
  opened: boolean;
  toggle: () => void;
  children?: React.ReactNode;
};

export function PostCollapse({ opened, toggle, children }: PostCollapseProps) {
  return (
    <Box maw={400} mx="auto">
      <div
        className="flex h-11 w-full items-center justify-between border-b-2 border-t-2 px-3 hover:bg-gray-100"
        onClick={toggle}
      >
        <span>Food categories</span>
        {opened ? (
          <ChevronDownIcon className="h-5 w-5" />
        ) : (
          <ChevronUpIcon className="h-5 w-5" />
        )}
      </div>

      <Collapse in={opened}>{children}</Collapse>
    </Box>
  );
}
