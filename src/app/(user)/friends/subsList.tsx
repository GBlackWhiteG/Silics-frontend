import { Subscribers } from './subscribers';
import { Subscriptions } from './subscriptions';

export function SubsList() {
	return (
		<div className='items flex flex-col gap-6'>
			<Subscriptions />
			<Subscribers />
		</div>
	);
}
