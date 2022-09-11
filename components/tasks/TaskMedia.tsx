import type { Dispatch, FC, SetStateAction } from 'react';
import type { defaultMedia, pickupMediaList } from 'utils/constants/taskMedia';
import { memo } from 'react';

export interface TaskMediaProps {
  media: typeof defaultMedia;
  setter: Dispatch<SetStateAction<typeof defaultMedia>>;
  mediaList: typeof pickupMediaList;
}

export const TaskMedia: FC<TaskMediaProps> = ({ media, setter, mediaList }) => {
  return null;
};

export const MemoizedTaskMedia = memo(TaskMedia);

export default MemoizedTaskMedia;
