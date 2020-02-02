import { FC, useState, useEffect } from 'react'
import React from 'react'
import { Menu } from 'antd'
import { MenuList } from '../../interface/layout/menu.interface'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomIcon } from './customIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalItem } from '~/actions/global.action'
import { AppState } from '~/stores'
import { addTag } from '~/actions/tagsView.action'

const { SubMenu, Item } = Menu

interface Props {
  menuList: MenuList
}

const MenuComponent: FC<Props> = ({ menuList }) => {
  const [openKeys, setOpenkeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { collapsed, device, locale } = useSelector((state: AppState) => state.globalReducer)
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label[locale]}</span>
      </span>
    )
  }

  const onMenuClick = (menu: MenuList[0]) => {
    if (menu.path === pathname) return
    const { key, label, path } = menu
    setSelectedKeys([key])
    dispatch(setGlobalItem({ collapsed: device !== 'DESKTOP' }))
    dispatch(
      addTag({
        id: key,
        label,
        path,
        closable: true
      })
    )
    history.push(path)
  }

  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenkeys(collapsed ? [] : ['/' + pathname.split('/')[1]])
  }, [collapsed, pathname])

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={keys => setOpenkeys([keys.pop()!])}
      className="layout-page-sider-menu"
    >
      {menuList?.map(menu =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)}>
            {menu.children.map(child => (
              <Item key={child.path} onClick={() => onMenuClick(child)}>
                {child.label[locale]}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitie(menu)}
          </Item>
        )
      )}
    </Menu>
  )
}

export default MenuComponent
