// src/data/componentSnippets.ts

export interface ComponentSnippet {
  imports: string[];
  code: string;
}

export const componentSnippets: Record<string, ComponentSnippet> = {
  "accordion-default": {
    imports: [
      "Accordion",
      "AccordionItem",
      "AccordionHeader",
      "AccordionPanel",
      "Typography",
    ],
    code: `<Accordion>
  <AccordionItem value="item-1">
    <AccordionHeader>Section 1 title</AccordionHeader>
    <AccordionPanel>
      <Typography>Section 1 content</Typography>
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionHeader>Section 2 title</AccordionHeader>
    <AccordionPanel>
      <Typography>Section 2 content</Typography>
    </AccordionPanel>
  </AccordionItem>
</Accordion>`,
  },
  "banner-default": {
    imports: [
      "Banner",
      "BannerIcon",
      "BannerContent",
      "BannerCloseButton",
      "Typography",
    ],
    code: `<Banner>
  <BannerIcon />
  <BannerContent className="v-pl-2 v-pb-2">
    <Typography>This is required text that describes the banner in more detail.</Typography>
  </BannerContent>
  <BannerCloseButton />
</Banner>`,
  },
  "breadcrumbs-default": {
    imports: ["Breadcrumbs", "Link"],
    code: `<Breadcrumbs ariaLabel="Default breadcrumbs">
  <ol>
    <li><Link href="./">L1 label</Link></li>
    <li><Link href="./">L2 label</Link></li>
    <li><Link href="./">L3 label</Link></li>
    <li><span aria-current="page">L4 label</span></li>
  </ol>
</Breadcrumbs>`,
  },
  "button-default": {
    imports: ["Button"],
    code: `<Button>Primary action</Button>`,
  },
  "checkbox-default": {
    imports: ["Checkbox", "Label", "Utility"],
    code: `<Utility vAlignItems="center" vFlex vGap={2}>
  <Checkbox id="checkbox-default" />
  <Label htmlFor="checkbox-default">Label</Label>
</Utility>`,
  },
  "selection-chip-default": {
    imports: ["Checkbox", "Chip"],
    code: `<Chip chipType="selection" htmlFor="default-selection-chip" tag="label">
  Label
  <Checkbox id="default-selection-chip" />
</Chip>`,
  },
  "combobox-default": {
    imports: [
      "Button",
      "Combobox",
      "DropdownContainer",
      "Input",
      "InputContainer",
      "Label",
      "Listbox",
      "ListboxContainer",
      "ListboxItem",
      "Radio",
      "UtilityFragment",
      "VisaChevronDownTiny",
    ],
    code: `<Combobox>
  <UtilityFragment vFlex vFlexCol vGap={4}>
    <DropdownContainer>
      <Label htmlFor="combobox-input">Label</Label>
      <UtilityFragment vFlexRow>
        <InputContainer>
          <Input id="combobox-input" aria-haspopup="listbox" />
          <Button
            aria-label="expand"
            buttonSize="small"
            colorScheme="tertiary"
            iconButton
          >
            <VisaChevronDownTiny />
          </Button>
        </InputContainer>
      </UtilityFragment>
    </DropdownContainer>
  </UtilityFragment>
  <ListboxContainer>
    <Listbox>
      {["Option A", "Option B", "Option C"].map((value, index) => (
        <ListboxItem key={index}>
          <UtilityFragment vFlexShrink0>
            <Radio tag="span" />
          </UtilityFragment>
          {value}
        </ListboxItem>
      ))}
    </Listbox>
  </ListboxContainer>
</Combobox>`,
  },
  "content-card-default": {
    imports: [
      "ContentCard",
      "ContentCardBody",
      "ContentCardTitle",
      "ContentCardSubtitle",
      "Typography",
      "Button",
      "Link",
      "Utility",
      "VisaChevronRightTiny",
    ],
    code: `<ContentCard>
  <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
    <ContentCardTitle variant="headline-4">Headline</ContentCardTitle>
    <ContentCardSubtitle variant="subtitle-3">Subtitle</ContentCardSubtitle>
    <Typography className="v-pt-4">
      This is optional text that describes the headline and subtitle in more detail.
    </Typography>
    <Utility vAlignItems="center" vFlex vFlexWrap vGap={16} vPaddingTop={12}>
      <Button>Primary action</Button>
      <Link href="./content-card" noUnderline>
        Destination label <VisaChevronRightTiny rtl />
      </Link>
    </Utility>
  </Utility>
</ContentCard>`,
  },
  "date-selector-default": {
    imports: ["Input", "InputContainer", "Label", "Utility"],
    code: `<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="default-date-selector">Label (required)</Label>
  <InputContainer>
    <Input id="default-date-selector" required type="date" />
  </InputContainer>
</Utility>`,
  },
  "dialog-default": {
    imports: [
      "Button",
      "Dialog",
      "DialogCloseButton",
      "DialogContent",
      "DialogHeader",
      "Typography",
      "useFocusTrap",
      "Utility",
    ],
    code: `const { onKeyNavigation, ref } = useFocusTrap();

return (
  <>
    <Button onClick={() => ref.current?.showModal()}>Open default dialog</Button>
    <Dialog
      aria-describedby="dialog-description"
      aria-labelledby="dialog-title"
      id="dialog"
      ref={ref}
      onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
    >
      <DialogContent>
        <DialogHeader id="dialog-title">Default title</DialogHeader>
        <Typography id="dialog-description">
          This is required text that describes the dialog title in more detail.
        </Typography>
        <Utility vAlignItems="center" vFlex vFlexWrap vGap={8} vPaddingTop={16}>
          <Button>Primary action</Button>
          <Button colorScheme="secondary">Secondary action</Button>
        </Utility>
      </DialogContent>
      <DialogCloseButton onClick={() => ref.current?.close()} />
    </Dialog>
  </>
);`,
  },
  "dropdown-menu-default": {
    imports: [
      "useState",
      "useClick",
      "useFloating",
      "useInteractions",
      "Button",
      "DropdownButton",
      "DropdownMenu",
      "Listbox",
      "UtilityFragment",
      "VisaChevronDownTiny",
      "VisaChevronUpTiny",
    ],
    code: `const [open, setOpen] = useState(false);

const { context, floatingStyles, refs } = useFloating({
  open,
  onOpenChange: setOpen,
  placement: 'bottom-start',
});

const onClick = useClick(context);
const { getReferenceProps, getFloatingProps } = useInteractions([onClick]);

return (
  <div style={{ blockSize: 250 }}>
    <DropdownButton
      aria-controls="dropdown-menu-default"
      aria-expanded={open}
      id="dropdown-menu-default-button"
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      Action
      {open ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />}
    </DropdownButton>
    {open && (
      <DropdownMenu
        id="dropdown-menu-default"
        aria-hidden={!open}
        ref={refs.setFloating}
        style={{ inlineSize: '180px', ...floatingStyles }}
        {...getFloatingProps()}
      >
        <UtilityFragment vHide={!open}>
          <Listbox>
            {["Label 1", "Label 2", "Label 3", "Label 4"].map((label, i) => (
              <li key={i}>
                <UtilityFragment
                  vFlex
                  vFlexRow
                  vAlignItems="start"
                  vGap={6}
                  vPaddingHorizontal={8}
                  vPaddingVertical={11}
                >
                  <Button className="v-listbox-item" colorScheme="tertiary" subtle>
                    {label}
                  </Button>
                </UtilityFragment>
              </li>
            ))}
          </Listbox>
        </UtilityFragment>
      </DropdownMenu>
    )}
  </div>
);`,
  },
  "footer-default": {
    imports: ["Footer", "Link", "Utility", "VisaLogo"],
    code: `<Footer className="v-gap-15">
  <Utility vFlex vMarginRight={1}>
    <VisaLogo aria-label="Visa" />
  </Utility>
  <Utility vFlex vFlexWrap vFlexGrow vJustifyContent="between" vGap={42}>
    { \`Copyright © \${new Date().getFullYear()} Visa Inc. All Rights Reserved\` }
    <Utility tag="ul" vFlex vFlexWrap vGap={16}>
      <li><Link href="/footer">Contact us</Link></li>
      <li><Link href="/footer">Privacy</Link></li>
      <li><Link href="/footer">Legal/terms and conditions</Link></li>
    </Utility>
  </Utility>
</Footer>`,
  },
  "horizontal-nav-default": {
    imports: [
      "Nav",
      "Tab",
      "Tabs",
      "Badge",
      "Button",
      "DropdownButton",
      "DropdownMenu",
      "Link",
      "Listbox",
      "ListboxItem",
      "Avatar",
      "Divider",
      "Input",
      "InputContainer",
      "NavAppName",
      "Surface",
      "Typography",
      "Utility",
      "UtilityFragment",
      "VisaLogo",
      "VisaAccountLow",
      "VisaChevronDownTiny",
      "VisaChevronUpTiny",
      "VisaCloseLow",
      "VisaCloseTiny",
      "VisaMenuLow",
      "VisaNotificationsLow",
      "VisaSearchLow",
    ],
    code: `// Horizontal navigation bar with tabs, dropdowns, search, and mobile menu
<Nav id="default-horizontal-nav" orientation="horizontal" tag="header">
  <Link skipLink href="#content">Skip to content</Link>

  <UtilityFragment vJustifyContent="between">
    <UtilityFragment vFlex vGap={16}>
      <Link
        aria-label="Visa Application Name Home"
        href="./horizontal-navigation"
        id="default-horizontal-nav-home-link"
        noUnderline
        style={{ backgroundColor: 'transparent' }}
      >
        <VisaLogo />
        <NavAppName>
          <Utility vContainerHide="xs" element={<Typography variant="headline-3">Application Name</Typography>} />
        </NavAppName>
      </Link>
    </UtilityFragment>

    <Tabs>
      <Tab>
        <Button buttonSize="large" colorScheme="tertiary" element={<a href="./horizontal-navigation">L1 label 1</a>} />
      </Tab>
      <Tab>
        <Button buttonSize="large" colorScheme="tertiary" element={<a href="./horizontal-navigation">L1 label 2</a>} />
      </Tab>
      <Tab>
        <DropdownButton
          buttonSize="large"
          colorScheme="tertiary"
          aria-expanded={false}
        >
          L1 label 3
          <TabSuffix element={<VisaChevronDownTiny />} />
        </DropdownButton>
      </Tab>
    </Tabs>

    <Utility vFlex vGap={8}>
      <Button buttonSize="large" colorScheme="tertiary" iconButton aria-label="search site">
        <VisaSearchLow />
      </Button>
      <Button buttonSize="large" colorScheme="tertiary" iconButton aria-label="notifications">
        <VisaNotificationsLow />
        <Badge badgeVariant="number" tag="sup">3</Badge>
      </Button>
      <Tab tag="div">
        <DropdownButton
          buttonSize="large"
          colorScheme="tertiary"
          aria-label="Alex Miller"
          element={<Avatar tag="button" />}
        >
          <VisaAccountLow />
          <TabSuffix element={<VisaChevronDownTiny />} />
        </DropdownButton>
      </Tab>
    </Utility>
  </UtilityFragment>
</Nav>`,
  },
  "listbox-single-select-default": {
    imports: ["Label", "Listbox", "ListboxContainer", "ListboxItem", "Radio"],
    code: `<fieldset>
  <Label id={\`\${id}-legend\`} tag="legend">
    Label (required)
  </Label>
  <ListboxContainer>
    <Listbox id={id} scroll tag="div" aria-labelledby={\`\${id}-legend\`}>
      {options.map((option, index) => {
        const optionId = \`\${id}-option-\${index}\`;
        return (
          <ListboxItem htmlFor={optionId} key={optionId} tag="label">
            <Radio className="v-flex-shrink-0" id={optionId} name={\`\${id}-options\`} />
            <Label tag="span">{option}</Label>
          </ListboxItem>
        );
      })}
    </Listbox>
  </ListboxContainer>
</fieldset>`,
  },
  "modal-panel-default": {
    imports: [
      "Button",
      "Panel",
      "PanelBody",
      "PanelContent",
      "PanelHeader",
      "Typography",
      "useFocusTrap",
      "Utility",
      "VisaCloseTiny",
    ],
    code: `<>
  <Button onClick={() => ref.current?.showModal()}>Open modal panel</Button>
  <Panel
    aria-describedby={\`\${id}-description\`}
    aria-labelledby={\`\${id}-title\`}
    aria-modal="true"
    id={id}
    onKeyDown={e => onKeyNavigation(e, ref.current?.open)}
    ref={ref}
    tag="dialog"
  >
    <PanelContent>
      <Utility element={<PanelHeader />} vFlex vFlexRow vJustifyContent="between" vGap={4}>
        <Typography id={\`\${id}-title\`} tag="h2" variant="headline-3">
          Panel title
        </Typography>
        <Button
          aria-label="Close panel"
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
        <Typography id={\`\${id}-description\`} tag="h3" variant="subtitle-2">
          Panel subtitle
        </Typography>
        <Typography>
          This is required text that can be used to describe the panel title and subtitle in more detail.
        </Typography>
      </PanelBody>
    </PanelContent>
  </Panel>
</>`,
  },
  "pagination-default": {
    imports: [
      "Button",
      "Pagination",
      "PaginationOverflow",
      "VisaArrowEndTiny",
      "VisaArrowStartTiny",
      "VisaChevronLeftTiny",
      "VisaChevronRightTiny",
      "VisaOptionHorizontalTiny",
    ],
    code: `<nav aria-label="1 digit pagination" role="navigation">
  <Pagination className="v-flex v-flex-row v-align-items-center v-gap-4">
    <li className="v-mobile-container-hide">
      <Button aria-label="Go to first page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
        <VisaArrowStartTiny rtl />
      </Button>
    </li>
    <li>
      <Button aria-label="Go to previous page" buttonSize="small" colorScheme="tertiary" disabled iconButton>
        <VisaChevronLeftTiny rtl />
      </Button>
    </li>
    <li>
      <Button aria-current="true" aria-label="Page 1" colorScheme="tertiary">
        1
      </Button>
    </li>
    <li>
      <Button aria-label="Page 2" colorScheme="tertiary">
        2
      </Button>
    </li>
    <li>
      <Button aria-label="Page 3" colorScheme="tertiary">
        3
      </Button>
    </li>
    <li className="v-mobile-container-hide">
      <Button aria-label="Page 4" colorScheme="tertiary">
        4
      </Button>
    </li>
    <li className="v-mobile-container-hide">
      <Button aria-label="Page 5" colorScheme="tertiary">
        5
      </Button>
    </li>
    <li className="v-mobile-container-hide">
      <Button aria-label="Page 6" colorScheme="tertiary">
        6
      </Button>
    </li>
    <li className="v-mobile-container-hide">
      <Button aria-label="Page 7" colorScheme="tertiary">
        7
      </Button>
    </li>
    <PaginationOverflow className="v-flex v-align-items-center v-mobile-container-hide">
      <VisaOptionHorizontalTiny />
    </PaginationOverflow>
    <li className="v-mobile-container-hide">
      <Button aria-label="Page 100" colorScheme="tertiary">
        100
      </Button>
    </li>
    <li>
      <Button aria-label="Go to next page" buttonSize="small" colorScheme="tertiary" iconButton>
        <VisaChevronRightTiny rtl />
      </Button>
    </li>
    <li className="v-mobile-container-hide">
      <Button aria-label="Go to last page" buttonSize="small" colorScheme="tertiary" iconButton>
        <VisaArrowEndTiny rtl />
      </Button>
    </li>
  </Pagination>
</nav>`,
  },
  "radio-default": {
    imports: ["Radio", "Label", "Utility"],
    code: `<Utility vAlignItems="center" vFlex vGap={2}>
  <Radio id="default-radio" name="default-radio" />
  <Label htmlFor="default-radio">Label</Label>
</Utility>`,
  },
  "select-default": {
    imports: [
      "Select",
      "Label",
      "Utility",
      "InputContainer",
      "InputControl",
      "VisaChevronDownTiny",
    ],
    code: `<Utility tag="fieldset" vFlex vFlexCol vGap={6}>
  <Label htmlFor="default-select">Label (required)</Label>
  <InputContainer>
    <Select id="default-select" name="default-select-name">
      <option hidden value="" />
      <option value="0">Option A</option>
      <option value="1">Option B</option>
      <option value="2">Option C</option>
      <option value="3">Option D</option>
      <option value="4">Option E</option>
    </Select>
    <InputControl>
      <VisaChevronDownTiny />
    </InputControl>
  </InputContainer>
</Utility>`,
  },
  "default-switch": {
    imports: ["Switch", "SwitchLabel", "Utility"],
    code: `<Utility vFlex vFlexWrap vGap={10} vJustifyContent="between" vMargin={8} style={{ maxInlineSize: '288px' }}>
  <SwitchLabel htmlFor="default-switch-example-switch">Label</SwitchLabel>
  <Switch id="default-switch-example-switch" name="default-switch" />
</Utility>`,
  },
  "large-padding-banded-table": {
    imports: ["Table", "Thead", "Tbody", "Tr", "Th", "Td", "ScreenReader"],
    code: `<Table
  alternate
  style={{
    '--v-table-data-padding-block-default': 'var(--v-table-data-padding-block-large)',
    '--v-table-data-block-default': 'var(--v-table-data-block-large)',
  }}
>
  <ScreenReader tag="caption">Table with large padding and banded rows.</ScreenReader>
  <Thead>
    <Tr>
      <Th scope="col">Column A</Th>
      <Th scope="col">Column B</Th>
      <Th scope="col">Column C</Th>
      <Th scope="col">Column D</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>A1</Td>
      <Td>B1</Td>
      <Td>C1</Td>
      <Td>D1</Td>
    </Tr>
    <Tr>
      <Td>A2</Td>
      <Td>B2</Td>
      <Td>C2</Td>
      <Td>D2</Td>
    </Tr>
    <Tr>
      <Td>A3</Td>
      <Td>B3</Td>
      <Td>C3</Td>
      <Td>D3</Td>
    </Tr>
  </Tbody>
</Table>`,
  },
  "input-default": {
    imports: ["Input", "InputContainer", "Label", "Utility"],
    code: `<Utility vFlex vFlexCol vGap={4}>
  <Label htmlFor="input-default">Label (required)</Label>
  <InputContainer>
    <Input aria-required="true" id="input-default" type="text" />
  </InputContainer>
</Utility>`,
  },
};
