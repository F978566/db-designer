import { RelationshipService } from '../../../../services/Relationship.service';
import { useQuery } from 'react-query';
import Xarrow from 'react-xarrows';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../reducers/project';


const DrawRelationships = () => {
    const project_id = useSelector(projectSelector);
    const { data, isLoading } = useQuery(
        {
            queryKey: ['relationships', project_id],
            queryFn: async () => await RelationshipService.getProjectRelationShips({project_id}),
        }
    )

    if (isLoading) {
        return
    }

    return (
        <>
            {
                data?.length ? data.map(relationsip => (
                    <Xarrow
                        start={relationsip.from_table+''}
                        end={relationsip.to_table+''}
                        key={relationsip.id}
                    />
                )) : ''
            }

        </>
    )
}


export default DrawRelationships;