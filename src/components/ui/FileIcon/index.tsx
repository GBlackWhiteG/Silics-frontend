import { FileCode, FilePieChart, FileQuestion, FileSpreadsheet, FileText } from 'lucide-react';

export function FileIcon({ mime }: { mime: string }) {
	if (mime.includes('excel')) return <FileSpreadsheet />;
	if (mime.includes('presentation')) return <FilePieChart />;
	if (
		mime.startsWith('text/') ||
		mime === 'application/pdf' ||
		mime === 'application/msword' ||
		mime.includes('word')
	)
		return <FileText />;
	if (
		mime.includes('javascript') ||
		mime.includes('x-python') ||
		mime.includes('x-c') ||
		mime.includes('x-httpd-php')
	)
		return <FileCode />;
	return <FileQuestion />;
}
