interface NotePreviewProps {
  text: string;
}

export const NotePreview = ({ text }: NotePreviewProps) => {
  if (!text) return null;
  return <div className="note-preview">„{text}”</div>;
};
