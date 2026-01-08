export interface CodeSnippet {
  code: string;
  description?: string;
}

export interface CleanCodeExample {
  id: string;
  title: string;
  category: 'Variables' | 'Functions' | 'Classes' | 'Async' | 'Error Handling';
  bad: CodeSnippet;
  good: CodeSnippet;
  principle: string;
}

export interface ExplanationState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
}