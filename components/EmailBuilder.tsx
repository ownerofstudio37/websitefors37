'use client'

import React, { useState } from 'react'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Layout, 
  MoveUp, 
  MoveDown,
  Settings,
  Eye,
  Code
} from 'lucide-react'
import ImageUploader from './ImageUploader'

// --- Types ---

export type EmailBlockType = 'hero' | 'text' | 'image' | 'button' | 'spacer' | 'divider' | 'columns'

export interface EmailBlock {
  id: string
  type: EmailBlockType
  content: any
}

// --- Block Definitions ---

const BLOCK_TYPES = [
  { type: 'hero', label: 'Hero Section', icon: Layout },
  { type: 'text', label: 'Text Block', icon: Type },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'button', label: 'Button', icon: Square },
  { type: 'columns', label: 'Columns', icon: Layout },
  { type: 'spacer', label: 'Spacer', icon: MoveUp },
  { type: 'divider', label: 'Divider', icon: MoveDown },
]

// --- Helper: Generate HTML ---

export const renderEmailHtml = (blocks: EmailBlock[]) => {
  const renderBlock = (block: EmailBlock) => {
    switch (block.type) {
      case 'hero':
        return `
          <div style="text-align: center; padding: 40px 20px; background-color: ${block.content.backgroundColor || '#f3f4f6'};">
            ${block.content.imageUrl ? `<img src="${block.content.imageUrl}" alt="Hero" style="max-width: 100%; height: auto; margin-bottom: 20px; border-radius: 8px;" />` : ''}
            <h1 style="margin: 0 0 10px 0; color: ${block.content.textColor || '#111827'}; font-family: sans-serif; font-size: 24px;">${block.content.title || 'Hero Title'}</h1>
            <p style="margin: 0 0 20px 0; color: ${block.content.textColor || '#4b5563'}; font-family: sans-serif; font-size: 16px;">${block.content.subtitle || 'Subtitle goes here'}</p>
            ${block.content.buttonText ? `<a href="${block.content.buttonUrl || '#'}" style="display: inline-block; padding: 12px 24px; background-color: ${block.content.buttonColor || '#000000'}; color: #ffffff; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-weight: bold;">${block.content.buttonText}</a>` : ''}
          </div>
        `
      case 'text':
        // Simple markdown-like to HTML or just wrap in p
        const textHtml = block.content.text
          ? block.content.text.split('\n').map((line: string) => `<p style="margin: 0 0 10px 0; font-family: sans-serif; color: #374151; line-height: 1.5;">${line}</p>`).join('')
          : ''
        return `<div style="padding: 20px;">${textHtml}</div>`
      case 'image':
        return `
          <div style="padding: 20px; text-align: ${block.content.align || 'center'};">
            <img src="${block.content.url || 'https://via.placeholder.com/600x300'}" alt="${block.content.alt || 'Image'}" style="max-width: 100%; height: auto; border-radius: 4px;" />
          </div>
        `
      case 'button':
        return `
          <div style="padding: 20px; text-align: ${block.content.align || 'center'};">
            <a href="${block.content.url || '#'}" style="display: inline-block; padding: 12px 24px; background-color: ${block.content.backgroundColor || '#000000'}; color: ${block.content.textColor || '#ffffff'}; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-weight: bold;">${block.content.text || 'Click Me'}</a>
          </div>
        `
      case 'spacer':
        return `<div style="height: ${block.content.height || 20}px;"></div>`
      case 'divider':
        return `<div style="padding: 20px;"><hr style="border: 0; border-top: 1px solid #e5e7eb;" /></div>`
      case 'columns':
        // Basic 2 column support
        return `
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="50%" valign="top" style="padding: 10px;">
                <div style="font-family: sans-serif; color: #374151;">${block.content.col1Text || 'Column 1'}</div>
              </td>
              <td width="50%" valign="top" style="padding: 10px;">
                <div style="font-family: sans-serif; color: #374151;">${block.content.col2Text || 'Column 2'}</div>
              </td>
            </tr>
          </table>
        `
      default:
        return ''
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #ffffff;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${blocks.map(renderBlock).join('')}
      </div>
    </body>
    </html>
  `
}

// --- Components ---

const SortableBlock = ({ block, onRemove, onEdit, isSelected }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getIcon = () => {
    const type = BLOCK_TYPES.find(t => t.type === block.type)
    const Icon = type ? type.icon : Square
    return <Icon className="w-4 h-4" />
  }

  const getLabel = () => {
    const type = BLOCK_TYPES.find(t => t.type === block.type)
    return type ? type.label : block.type
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-2 p-3 mb-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200'}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div 
        className="flex-1 flex items-center gap-3 cursor-pointer"
        onClick={() => onEdit(block)}
      >
        <div className="p-2 bg-gray-100 rounded-md text-gray-600">
          {getIcon()}
        </div>
        <div>
          <div className="font-medium text-sm text-gray-900">{getLabel()}</div>
          <div className="text-xs text-gray-500 truncate max-w-[200px]">
            {block.type === 'text' ? (block.content.text || 'Empty text') : 
             block.type === 'hero' ? (block.content.title || 'Hero') :
             block.type === 'button' ? (block.content.text || 'Button') :
             'Configure block'}
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(block.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

const BlockEditor = ({ block, onChange }: { block: EmailBlock, onChange: (updates: any) => void }) => {
  if (!block) return <div className="p-4 text-gray-500 text-center">Select a block to edit</div>

  const handleChange = (key: string, value: any) => {
    onChange({ ...block.content, [key]: value })
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-medium text-gray-900 border-b pb-2 mb-4">Edit {BLOCK_TYPES.find(t => t.type === block.type)?.label}</h3>
      
      {block.type === 'hero' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={e => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={block.content.imageUrl || ''}
                onChange={e => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              {/* ImageUploader integration would go here */}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={block.content.buttonText || ''}
              onChange={e => handleChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
            <input
              type="text"
              value={block.content.buttonUrl || ''}
              onChange={e => handleChange('buttonUrl', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}

      {block.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={block.content.text || ''}
            onChange={e => handleChange('text', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border rounded-md font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Supports basic text. Newlines create paragraphs.</p>
        </div>
      )}

      {block.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={block.content.url || ''}
              onChange={e => handleChange('url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
            <input
              type="text"
              value={block.content.alt || ''}
              onChange={e => handleChange('alt', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
            <select
              value={block.content.align || 'center'}
              onChange={e => handleChange('align', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>
      )}

      {block.type === 'button' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
            <input
              type="text"
              value={block.content.text || ''}
              onChange={e => handleChange('text', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="text"
              value={block.content.url || ''}
              onChange={e => handleChange('url', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
              <input
                type="color"
                value={block.content.backgroundColor || '#000000'}
                onChange={e => handleChange('backgroundColor', e.target.value)}
                className="w-full h-10 p-1 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input
                type="color"
                value={block.content.textColor || '#ffffff'}
                onChange={e => handleChange('textColor', e.target.value)}
                className="w-full h-10 p-1 border rounded-md"
              />
            </div>
          </div>
        </>
      )}

      {block.type === 'spacer' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
          <input
            type="number"
            value={block.content.height || 20}
            onChange={e => handleChange('height', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {block.type === 'columns' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Column 1 Text</label>
            <textarea
              value={block.content.col1Text || ''}
              onChange={e => handleChange('col1Text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Column 2 Text</label>
            <textarea
              value={block.content.col2Text || ''}
              onChange={e => handleChange('col2Text', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}
    </div>
  )
}

// --- Main Component ---

export default function EmailBuilder({ 
  initialBlocks = [], 
  onChange 
}: { 
  initialBlocks?: EmailBlock[], 
  onChange?: (html: string, blocks: EmailBlock[]) => void 
}) {
  const [blocks, setBlocks] = useState<EmailBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newBlocks = arrayMove(items, oldIndex, newIndex)
        notifyChange(newBlocks)
        return newBlocks
      })
    }
  }

  const addBlock = (type: EmailBlockType) => {
    const newBlock: EmailBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: getDefaultContent(type)
    }
    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    setSelectedBlockId(newBlock.id)
    notifyChange(newBlocks)
  }

  const updateBlock = (id: string, content: any) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, content } : b)
    setBlocks(newBlocks)
    notifyChange(newBlocks)
  }

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id)
    setBlocks(newBlocks)
    if (selectedBlockId === id) setSelectedBlockId(null)
    notifyChange(newBlocks)
  }

  const notifyChange = (currentBlocks: EmailBlock[]) => {
    if (onChange) {
      const html = renderEmailHtml(currentBlocks)
      onChange(html, currentBlocks)
    }
  }

  const getDefaultContent = (type: EmailBlockType) => {
    switch (type) {
      case 'hero': return { title: 'Welcome!', subtitle: 'Thanks for joining us.', buttonText: 'Get Started', backgroundColor: '#f3f4f6' }
      case 'text': return { text: 'Add your text here...' }
      case 'image': return { url: '', alt: 'Image', align: 'center' }
      case 'button': return { text: 'Click Me', url: '#', backgroundColor: '#000000', textColor: '#ffffff', align: 'center' }
      case 'spacer': return { height: 20 }
      case 'divider': return {}
      case 'columns': return { col1Text: 'Left column content', col2Text: 'Right column content' }
      default: return {}
    }
  }

  const selectedBlock = blocks.find(b => b.id === selectedBlockId)

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden bg-gray-50">
      {/* Left Sidebar: Blocks List */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Blocks</h3>
          <p className="text-xs text-gray-500">Drag to reorder</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={blocks.map(b => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock 
                  key={block.id} 
                  block={block} 
                  onRemove={removeBlock}
                  onEdit={(b: EmailBlock) => setSelectedBlockId(b.id)}
                  isSelected={selectedBlockId === block.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          {blocks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              <p>No blocks yet</p>
              <p className="text-xs">Add one below</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            {BLOCK_TYPES.map(type => (
              <button
                key={type.type}
                onClick={() => addBlock(type.type as EmailBlockType)}
                className="flex flex-col items-center justify-center p-2 bg-white border rounded-md hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors text-xs gap-1"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Preview */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-2 border-b bg-white flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setMode('edit')}
              className={`px-3 py-1 rounded-md text-sm ${mode === 'edit' ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setMode('preview')}
              className={`px-3 py-1 rounded-md text-sm ${mode === 'preview' ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Preview
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
          <div className="max-w-[600px] mx-auto bg-white shadow-lg min-h-[500px] rounded-sm overflow-hidden">
            {mode === 'edit' ? (
              <div className="divide-y divide-dashed divide-gray-200">
                {blocks.map(block => (
                  <div 
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={`relative group cursor-pointer hover:bg-blue-50 transition-colors ${selectedBlockId === block.id ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: renderEmailHtml([block]).replace(/<body.*?>|<\/body>|<\/html>|<!DOCTYPE html>|<html>|<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">|<\/div>$/g, '') }} />
                  </div>
                ))}
                {blocks.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                    Start adding blocks from the left sidebar
                  </div>
                )}
              </div>
            ) : (
              <iframe 
                srcDoc={renderEmailHtml(blocks)}
                className="w-full h-full min-h-[500px] border-none"
                title="Email Preview"
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Settings */}
      <div className="w-72 bg-white border-l overflow-y-auto">
        {selectedBlock ? (
          <BlockEditor 
            block={selectedBlock} 
            onChange={(content) => updateBlock(selectedBlock.id, content)} 
          />
        ) : (
          <div className="p-8 text-center text-gray-400">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Select a block to configure its settings</p>
          </div>
        )}
      </div>
    </div>
  )
}
