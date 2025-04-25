import { CodeField } from './codeField';
import { Terminal } from './terminal';

export default function Code() {
	return (
		<section className='grid grid-cols-2 mb-2'>
			<CodeField />
			<Terminal />
		</section>
	);
}
