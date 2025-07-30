export interface PatternTemplate {
  title: string;
  description: string;
  components: string[];
  code: string;
}

export const patternTemplates: Record<string, PatternTemplate> = {
  "responsive login form with remember me": {
    title: "Responsive Login Form",
    description:
      "Accessible login form with email/password inputs, remember me checkbox, and submit button in a modal panel",
    components: ["Input", "Checkbox", "Button", "Panel"],
    code: `import { VisaCloseTiny } from '@visa/nova-icons-react';
import {
  Button,
  Checkbox,
  Input,
  InputContainer,
  Label,
  Panel,
  PanelBody,
  PanelContent,
  PanelHeader,
  Typography,
  useFocusTrap,
  Utility,
} from '@visa/nova-react';
import { useId } from 'react';

export const LoginForm = () => {
  const { onKeyNavigation, ref } = useFocusTrap();
  const panelId = useId();
  const emailId = useId();
  const passwordId = useId();
  const rememberMeId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted');
  };

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>
        Sign In
      </Button>
      
      <Panel
        aria-describedby={\`\${panelId}-description\`}
        aria-labelledby={\`\${panelId}-title\`}
        aria-modal="true"
        id={panelId}
        onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
        ref={ref}
        tag="dialog"
      >
        <PanelContent>
          <Utility element={<PanelHeader />} vFlex vFlexRow vJustifyContent="between" vGap={4}>
            <Typography id={\`\${panelId}-title\`} tag="h2" variant="headline-3">
              Sign In
            </Typography>
            <Button
              aria-label="Close login form"
              buttonSize="small"
              className="-v-mt-3 -v-mr-8"
              colorScheme="tertiary"
              iconButton
              onClick={() => ref.current?.close()}
              subtle
            >
              <VisaCloseTiny />
            </Button>
          </Utility>
          
          <PanelBody>
            <Typography id={\`\${panelId}-description\`} tag="p" variant="body-1">
              Enter your credentials to access your account
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Utility vFlex vFlexCol vGap={6} className="v-mt-6">
                {/* Email Input */}
                <Utility vFlex vFlexCol vGap={2}>
                  <Label htmlFor={emailId}>Email Address</Label>
                  <InputContainer>
                    <Input
                      aria-required="true"
                      id={emailId}
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </InputContainer>
                </Utility>

                {/* Password Input */}
                <Utility vFlex vFlexCol vGap={2}>
                  <Label htmlFor={passwordId}>Password</Label>
                  <InputContainer>
                    <Input
                      aria-required="true"
                      id={passwordId}
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </InputContainer>
                </Utility>

                {/* Remember Me Checkbox */}
                <Utility vAlignItems="center" vFlex vGap={2}>
                  <Checkbox 
                    id={rememberMeId}
                    aria-label="Remember me for future logins" 
                  />
                  <Label htmlFor={rememberMeId} className="v-cursor-pointer">
                    Remember me
                  </Label>
                </Utility>

                {/* Submit Button */}
                <Utility vFlex vFlexCol vGap={3} className="v-mt-4">
                  <Button
                    type="submit"
                    buttonSize="large"
                    className="v-w-full"
                  >
                    Sign In
                  </Button>
                  
                  <Button
                    type="button"
                    colorScheme="tertiary"
                    buttonSize="large"
                    className="v-w-full"
                    onClick={() => {
                      // Handle forgot password
                      console.log('Forgot password clicked');
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Utility>
              </Utility>
            </form>
          </PanelBody>
        </PanelContent>
      </Panel>
    </>
  );
};`,
  },
  "search bar with filters": {
    title: "Search Bar with Filters",
    description:
      "Search input with category filter dropdown and search button for filtering results",
    components: ["Input", "Dropdown Menu", "Button"],
    code: `import { useClick, useFloating, useInteractions } from '@floating-ui/react';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaSearchTiny } from '@visa/nova-icons-react';
import { useState, useId } from 'react';
import {
  Button,
  DropdownButton,
  DropdownMenu,
  Input,
  InputContainer,
  Label,
  Listbox,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';

export const SearchBarWithFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [open, setOpen] = useState(false);
  
  const searchId = useId();
  const dropdownId = useId();

  // Floating UI setup for dropdown
  const { context, floatingStyles, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
  });
  const onClick = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([onClick]);

  const categories = [
    'All Categories',
    'Components',
    'Templates', 
    'Patterns',
    'Documentation'
  ];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in category:', selectedCategory);
    // Handle search logic here
  };

  return (
    <Utility vFlex vFlexCol vGap={4} className="v-w-full v-max-w-4xl">
      <Label htmlFor={searchId}>Search</Label>
      
      <form onSubmit={handleSearch}>
        <Utility vFlex vFlexRow vGap={3} vAlignItems="end">
          {/* Search Input */}
          <Utility vFlex vFlexCol vGap={2} className="v-flex-1">
            <InputContainer>
              <Input
                id={searchId}
                type="text"
                placeholder="Search components, patterns, or templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="v-w-full"
              />
            </InputContainer>
          </Utility>

          {/* Category Filter Dropdown */}
          <Utility vFlex vFlexCol vGap={2}>
            <DropdownButton
              aria-controls={dropdownId}
              aria-expanded={open}
              id={\`\${dropdownId}-button\`}
              ref={refs.setReference}
              className="v-min-w-40"
              {...getReferenceProps()}
            >
              {selectedCategory}
              {open ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />}
            </DropdownButton>
            
            {open && (
              <DropdownMenu
                id={dropdownId}
                aria-hidden={!open}
                ref={refs.setFloating}
                style={{ inlineSize: '200px', ...floatingStyles }}
                {...getFloatingProps()}
              >
                <UtilityFragment vHide={!open}>
                  <Listbox role="listbox">
                    {categories.map((category) => (
                      <li key={category} role="option">
                        <UtilityFragment
                          vFlex
                          vFlexRow
                          vAlignItems="start"
                          vGap={6}
                          vPaddingHorizontal={8}
                          vPaddingVertical={11}
                        >
                          <Button
                            className="v-listbox-item v-w-full v-text-left"
                            colorScheme={selectedCategory === category ? "primary" : "tertiary"}
                            subtle={selectedCategory !== category}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </Button>
                        </UtilityFragment>
                      </li>
                    ))}
                  </Listbox>
                </UtilityFragment>
              </DropdownMenu>
            )}
          </Utility>

          {/* Search Button */}
          <Button
            type="submit"
            buttonSize="large"
            iconButton
            aria-label="Search"
          >
            <VisaSearchTiny />
          </Button>
        </Utility>
      </form>
    </Utility>
  );
};`,
  },
  "contact form with validation": {
    title: "Contact Form with Validation",
    description:
      "Contact form with name, email, subject, and message fields plus validation banner feedback",
    components: ["Input", "Textarea", "Button", "Banner"],
    code: `import { useState, useId } from 'react';
import {
 Banner,
 BannerCloseButton,
 BannerContent,
 BannerIcon,
 Button,
 Input,
 InputContainer,
 Label,
 Textarea,
 Typography,
 Utility,
} from '@visa/nova-react';

export const ContactFormWithValidation = () => {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   subject: '',
   message: ''
 });
 const [errors, setErrors] = useState<string[]>([]);
 const [showSuccess, setShowSuccess] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const nameId = useId();
 const emailId = useId();
 const subjectId = useId();
 const messageId = useId();

 const validateForm = () => {
   const newErrors: string[] = [];
   
   if (!formData.name.trim()) newErrors.push('Name is required');
   if (!formData.email.trim()) {
     newErrors.push('Email is required');
   } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
     newErrors.push('Please enter a valid email address');
   }
   if (!formData.subject.trim()) newErrors.push('Subject is required');
   if (!formData.message.trim()) {
     newErrors.push('Message is required');
   } else if (formData.message.length < 10) {
     newErrors.push('Message must be at least 10 characters long');
   }
   
   return newErrors;
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   
   const validationErrors = validateForm();
   setErrors(validationErrors);
   
   if (validationErrors.length === 0) {
     await new Promise(resolve => setTimeout(resolve, 1000));
     setShowSuccess(true);
     setFormData({ name: '', email: '', subject: '', message: '' });
     console.log('Form submitted:', formData);
   }
   
   setIsSubmitting(false);
 };

 return (
   <Utility vFlex vFlexCol vGap={6} className="v-w-full v-max-w-2xl">
     <Typography tag="h2" variant="headline-3">
       Contact Us
     </Typography>

     {/* Success Banner */}
     {showSuccess && (
       <Banner colorScheme="success">
         <BannerIcon />
         <BannerContent className="v-pl-2 v-pb-2">
           <Typography>Thank you! Your message has been sent successfully.</Typography>
         </BannerContent>
         <BannerCloseButton onClick={() => setShowSuccess(false)} />
       </Banner>
     )}

     {/* Error Banner */}
     {errors.length > 0 && (
       <Banner colorScheme="error">
         <BannerIcon />
         <BannerContent className="v-pl-2 v-pb-2">
           <Typography>Please fix the following errors:</Typography>
           <ul className="v-mt-2 v-ml-4">
             {errors.map((error, index) => (
               <li key={index}>{error}</li>
             ))}
           </ul>
         </BannerContent>
         <BannerCloseButton onClick={() => setErrors([])} />
       </Banner>
     )}

     <form onSubmit={handleSubmit}>
       <Utility vFlex vFlexCol vGap={5}>
         {/* Name Field */}
         <Utility vFlex vFlexCol vGap={2}>
           <Label htmlFor={nameId}>Full Name *</Label>
           <InputContainer>
             <Input
               id={nameId}
               type="text"
               placeholder="Enter your full name"
               value={formData.name}
               onChange={(e) => setFormData({...formData, name: e.target.value})}
               aria-required="true"
             />
           </InputContainer>
         </Utility>

         {/* Email Field */}
         <Utility vFlex vFlexCol vGap={2}>
           <Label htmlFor={emailId}>Email Address *</Label>
           <InputContainer>
             <Input
               id={emailId}
               type="email"
               placeholder="Enter your email address"
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
               aria-required="true"
             />
           </InputContainer>
         </Utility>

         {/* Subject Field */}
         <Utility vFlex vFlexCol vGap={2}>
           <Label htmlFor={subjectId}>Subject *</Label>
           <InputContainer>
             <Input
               id={subjectId}
               type="text"
               placeholder="What is this about?"
               value={formData.subject}
               onChange={(e) => setFormData({...formData, subject: e.target.value})}
               aria-required="true"
             />
           </InputContainer>
         </Utility>

         {/* Message Field */}
         <Utility vFlex vFlexCol vGap={2}>
           <Label htmlFor={messageId}>Message *</Label>
           <Textarea
             id={messageId}
             placeholder="Please describe your inquiry in detail (minimum 10 characters)"
             value={formData.message}
             onChange={(e) => setFormData({...formData, message: e.target.value})}
             rows={5}
             aria-required="true"
           />
         </Utility>

         {/* Submit Button */}
         <Button
           type="submit"
           buttonSize="large"
           disabled={isSubmitting}
           className="v-w-full v-mt-4"
         >
           {isSubmitting ? 'Sending...' : 'Send Message'}
         </Button>
       </Utility>
     </form>
   </Utility>
 );
};`,
  },
  "data table with sorting": {
    title: "Data Table with Sorting",
    description:
      "Sortable data table with status badges and clickable column headers for ascending/descending sort",
    components: ["Table", "Button", "Badge"],
    code: `import { useState } from 'react';
import { VisaChevronUpTiny, VisaChevronDownTiny } from '@visa/nova-icons-react';
import {
  Badge,
  Button,
  ScreenReader,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Utility,
} from '@visa/nova-react';
import { CSSProperties } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortableColumn = 'name' | 'status' | 'date' | 'priority';

interface TableRow {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export const DataTableWithSorting = () => {
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const data: TableRow[] = [
    { id: 1, name: 'Project Alpha', status: 'active', date: '2024-01-15', priority: 'high' },
    { id: 2, name: 'Beta Testing', status: 'pending', date: '2024-01-10', priority: 'medium' },
    { id: 3, name: 'User Research', status: 'inactive', date: '2024-01-20', priority: 'low' },
    { id: 4, name: 'Design System', status: 'active', date: '2024-01-12', priority: 'high' },
  ];

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : null);
      if (sortDirection === 'desc') setSortColumn(null);
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    let aValue: any = a[sortColumn];
    let bValue: any = b[sortColumn];

    if (sortColumn === 'date') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />;
  };

  return (
    <Table
      alternate
      style={{
        '--v-table-data-padding-block-default': 'var(--v-table-data-padding-block-large)',
      } as CSSProperties}
    >
      <ScreenReader tag="caption">Sortable project data table</ScreenReader>
      <Thead>
        <Tr>
          <Th scope="col">
            <Button
              colorScheme="tertiary"
              subtle
              onClick={() => handleSort('name')}
              className="v-flex v-items-center v-gap-2"
            >
              Name {getSortIcon('name')}
            </Button>
          </Th>
          <Th scope="col">
            <Button
              colorScheme="tertiary"
              subtle
              onClick={() => handleSort('status')}
              className="v-flex v-items-center v-gap-2"
            >
              Status {getSortIcon('status')}
            </Button>
          </Th>
          <Th scope="col">
            <Button
              colorScheme="tertiary"
              subtle
              onClick={() => handleSort('date')}
              className="v-flex v-items-center v-gap-2"
            >
              Date {getSortIcon('date')}
            </Button>
          </Th>
          <Th scope="col">
            <Button
              colorScheme="tertiary"
              subtle
              onClick={() => handleSort('priority')}
              className="v-flex v-items-center v-gap-2"
            >
              Priority {getSortIcon('priority')}
            </Button>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedData.map((row) => (
          <Tr key={row.id}>
            <Td>{row.name}</Td>
            <Td>
              <Badge 
                colorScheme={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'neutral'}
              >
                {row.status}
              </Badge>
            </Td>
            <Td>{row.date}</Td>
            <Td>
              <Badge 
                colorScheme={row.priority === 'high' ? 'error' : row.priority === 'medium' ? 'warning' : 'success'}
              >
                {row.priority}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};`,
  },
  "notification toast with actions": {
    title: "Notification Toast with Actions",
    description:
      "Success, warning, and error notification banners with dismiss and action buttons",
    components: ["Banner", "Button"],
    code: `import { useState } from 'react';
import {
  Banner,
  BannerCloseButton,
  BannerContent,
  BannerIcon,
  Button,
  Typography,
  Utility,
} from '@visa/nova-react';

type NotificationType = 'success' | 'warning' | 'error' | 'information';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  actionLabel?: string;
}

export const NotificationToastWithActions = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
    };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAction = (id: number) => {
    console.log('Action clicked for notification:', id);
    removeNotification(id);
  };

  const showSuccess = () => {
    addNotification({
      type: 'success',
      title: 'Success!',
      message: 'Your changes have been saved successfully.',
      actionLabel: 'View Details'
    });
  };

  const showWarning = () => {
    addNotification({
      type: 'warning',
      title: 'Warning',
      message: 'Your session will expire in 5 minutes.',
      actionLabel: 'Extend Session'
    });
  };

  const showError = () => {
    addNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to save changes. Please try again.',
      actionLabel: 'Retry'
    });
  };

  const showInfo = () => {
    addNotification({
      type: 'information',
      title: 'New Feature',
      message: 'Check out our new component library updates!'
    });
  };

  return (
    <Utility vFlex vFlexCol vGap={4} className="v-w-full v-max-w-2xl">
      {/* Demo Buttons */}
      <Utility vFlex vFlexRow vGap={3}>
        <Button onClick={showSuccess}>Show Success</Button>
        <Button onClick={showWarning}>Show Warning</Button>
        <Button onClick={showError}>Show Error</Button>
        <Button onClick={showInfo}>Show Info</Button>
      </Utility>

      {/* Notifications Container */}
      <Utility vFlex vFlexCol vGap={3}>
        {notifications.map((notification) => (
          <Banner key={notification.id} colorScheme={notification.type}>
            <BannerIcon />
            <BannerContent className="v-pl-2 v-pb-2">
              <Typography variant="subtitle-2">
                {notification.title}
              </Typography>
              <Typography className="v-mt-1">
                {notification.message}
              </Typography>
              {notification.actionLabel && (
                <Button
                  buttonSize="small"
                  colorScheme="tertiary"
                  className="v-mt-3"
                  onClick={() => handleAction(notification.id)}
                >
                  {notification.actionLabel}
                </Button>
              )}
            </BannerContent>
            <BannerCloseButton onClick={() => removeNotification(notification.id)} />
          </Banner>
        ))}
      </Utility>
    </Utility>
  );
};`,
  },
};
