import type { DropoffTask } from 'types';
import { useState, useEffect, useRef, memo } from 'react';
import { useRecoilState } from 'recoil';
import { dropoffParcelState } from 'states';
import { Button, Divider } from '@mui/material';
import { MobileContainer } from 'components/common/mobile/MobileContainer';
import { ChecklistSummary } from './checklist/ChecklistSummary';
import { ChecklistFilter } from './checklist/ChecklistFilter';
import { CheckTaskList } from './checklist/CheckTaskList';
import { useTranslation } from 'next-i18next';

export interface DropoffChecklistProps {
  dropoffTasks?: DropoffTask[];
}

export const DropoffChecklist: React.FC<DropoffChecklistProps> = ({
  dropoffTasks = [],
}) => {
  const syncedRef = useRef(false);
  const { t } = useTranslation('tasks');
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<DropoffTask[]>([]);
  const [dropoffParcels, setDropoffParcels] =
    useRecoilState(dropoffParcelState);

  useEffect(() => {
    // reset local states
    return () => {
      syncedRef.current = false;
      setSelectedParcels([]);
    };
  }, []);

  useEffect(() => {
    setFilteredParcels(dropoffTasks);
    return () => setFilteredParcels([]);
  }, [dropoffTasks]);

  useEffect(() => {
    if (!syncedRef.current) {
      // sync recoil to local state
      setSelectedParcels(dropoffParcels);
      syncedRef.current = true;
    } else {
      // sync local state to recoil
      setDropoffParcels(selectedParcels);
    }
  }, [dropoffParcels, selectedParcels, setDropoffParcels]);

  const onConfirm = () => {
    console.log('confirm');
  };

  return (
    <>
      <ChecklistSummary />
      <ChecklistFilter
        dropoffTasks={dropoffTasks}
        selectedParcels={selectedParcels}
        setSelectedParcels={setSelectedParcels}
        filteredParcels={filteredParcels}
        setFilteredParcels={setFilteredParcels}
      />
      <Divider />
      <CheckTaskList dropoffTasks={filteredParcels} />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsa
      repudiandae sunt, tenetur accusamus nobis, eaque consequuntur quos placeat
      nulla non nisi quas ea doloribus explicabo dolores odio, est architecto
      voluptatem quia sit eos reiciendis? Error quisquam sint eos, adipisci hic
      deserunt ratione accusamus similique laborum deleniti, harum enim autem,
      temporibus laudantium est? Rem quod dolor blanditiis harum temporibus
      corporis ut pariatur dolorem fuga quis reiciendis, architecto minus
      consequuntur aliquam iusto neque exercitationem, asperiores suscipit
      quaerat saepe deserunt maxime. Consectetur ut asperiores nostrum, eaque
      sed necessitatibus, eos dolore ipsum ullam amet dolorum magnam id
      obcaecati atque quod molestias earum quasi neque deserunt similique
      accusantium. Sed amet, quibusdam expedita earum ea, debitis veniam labore
      aperiam dolore pariatur magnam libero deleniti quidem molestias? Ipsam
      velit, iste amet repellat omnis, ipsa et repudiandae, obcaecati est
      numquam ea possimus rem debitis? Maxime veniam harum ipsam eos quam fuga
      ipsa libero quisquam quo? Ipsam ex voluptas reprehenderit fugiat odit,
      cupiditate sequi porro voluptates sint repellat obcaecati similique
      corrupti natus praesentium ipsa modi rerum fugit suscipit laborum possimus
      officiis totam esse aliquid? Omnis eum sequi corporis. Aperiam blanditiis
      error non vel fugit, magnam, voluptates dolore repudiandae repellendus,
      inventore nobis eveniet corrupti voluptate molestias! Quasi voluptatum quo
      tempora quisquam, repudiandae tenetur officiis distinctio maiores a illum.
      Nulla at aliquam illum, commodi nostrum quos hic! Ipsum eius repellat esse
      ratione ab praesentium recusandae cumque. Earum sequi excepturi
      necessitatibus consequuntur distinctio, officia tempore illum ea
      asperiores accusantium cumque similique! Modi dolorum fugiat iure
      voluptatem est facilis cumque voluptas in ut quas odit unde, dolor rem
      atque ipsam, animi, alias voluptatibus laboriosam? Aspernatur vel, quas
      magni autem animi hic est, dolorem architecto reprehenderit ullam vero
      rerum neque voluptas suscipit. Autem iste perspiciatis rem. Iste quos a
      aspernatur enim quidem totam rerum, voluptates id perspiciatis atque
      quaerat saepe? Officia atque assumenda iure autem aut consequatur ipsum et
      veritatis, quod minima! Veritatis rerum dolore nemo hic molestiae dolores
      eius aliquam porro recusandae laborum eligendi, fuga error perferendis
      officia itaque culpa rem cumque! Nemo, porro? Cupiditate molestias
      laboriosam itaque id. Illum iste illo repellendus, hic dolore aliquid et
      cupiditate veritatis numquam quod temporibus asperiores totam? Molestias
      odio enim earum, quo eum sint consequatur laboriosam minima quae!
      Accusantium possimus maiores consequuntur in magni tempore delectus
      praesentium quidem iure cumque quos, assumenda accusamus dolore quas minus
      tenetur voluptatibus laudantium voluptates nisi inventore natus id? Illum
      natus sapiente officiis ex vitae facilis amet dicta veniam inventore,
      laborum mollitia cupiditate molestiae eaque obcaecati architecto id
      consequatur doloribus ducimus, hic earum nostrum perspiciatis animi!
      Magnam ducimus quasi accusantium voluptatem sit, aspernatur saepe, placeat
      repellendus, at nemo sed. Possimus aliquam, minima a sapiente maiores
      perspiciatis fugiat magnam? Quas, expedita. Enim ex porro veniam
      aspernatur, aut dolore a sint magnam minus sit amet! Atque repellat,
      debitis tenetur doloremque accusantium dolorum culpa, repudiandae dolore
      consectetur rerum, optio porro unde. Nesciunt dolore magni laudantium
      incidunt porro corporis, possimus est sapiente? Dolorem id atque natus,
      architecto rerum quibusdam non neque illo libero nulla a molestiae nam
      debitis adipisci nobis molestias qui maxime dicta.
      <MobileContainer
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <Button
          variant="contained"
          onClick={() => onConfirm()}
          sx={{
            width: '100%',
            maxWidth: (t) => t.spacing(40),
          }}
        >
          {`${t('btn.confirm')} (${selectedParcels.length}/${
            dropoffTasks.length
          })`}
        </Button>
      </MobileContainer>
    </>
  );
};

const MemoizedDropoffChecklist = memo(DropoffChecklist);

export default MemoizedDropoffChecklist;
